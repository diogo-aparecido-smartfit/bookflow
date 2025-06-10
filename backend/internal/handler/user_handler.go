package handler

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/usecase"
)

type UserHandler struct {
    userService *usecase.UserService
}

func NewUserHandler(userService *usecase.UserService) *UserHandler {
    return &UserHandler{
        userService: userService,
    }
}

// GetUser godoc
// @Summary      Get a user
// @Description  Get a user by its ID
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "User ID"
// @Success      200  {object}  domain.User
// @Failure      404  {object}  handler.ErrorResponse
// @Failure      500  {object}  handler.ErrorResponse
// @Router       /users/{id} [get]
func (h *UserHandler) GetUser(c *gin.Context) {
    id := c.Param("id")
    
    user, err := h.userService.GetUser(c.Request.Context(), id)
    if err != nil {
        if err == domain.ErrUserNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, user)
}

// ListUsers godoc
// @Summary      List users
// @Description  Get a paginated list of all users
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        page       query     int  false  "Page number"       default(1)
// @Param        page_size  query     int  false  "Items per page"    default(10)
// @Success      200        {array}   domain.User
// @Failure      500        {object}  handler.ErrorResponse
// @Router       /users [get]
func (h *UserHandler) ListUsers(c *gin.Context) {
    pageStr := c.DefaultQuery("page", "1")
    pageSizeStr := c.DefaultQuery("page_size", "10")
    
    page, err := strconv.Atoi(pageStr)
    if err != nil || page < 1 {
        page = 1
    }
    
    pageSize, err := strconv.Atoi(pageSizeStr)
    if err != nil || pageSize < 1 {
        pageSize = 10
    }
    
    users, err := h.userService.ListUsers(c.Request.Context(), page, pageSize)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, users)
}

// CreateUser godoc
// @Summary      Create a user
// @Description  Add a new user to the database
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        user  body      domain.User  true  "User information"
// @Success      201   {object}  domain.User
// @Failure      400   {object}  handler.ErrorResponse
// @Failure      500   {object}  handler.ErrorResponse
// @Router       /users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
    var user domain.User
    
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
        return
    }
    
    if err := h.userService.CreateUser(c.Request.Context(), &user); err != nil {
        if err == domain.ErrInvalidInput {
            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input or email already exists"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    user.Password = ""
    
    c.JSON(http.StatusCreated, user)
}

// UpdateUser godoc
// @Summary      Update a user
// @Description  Update an existing user by ID
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id    path      string       true  "User ID"
// @Param        user  body      domain.User  true  "User information"
// @Success      200   {object}  domain.User
// @Failure      400   {object}  handler.ErrorResponse
// @Failure      404   {object}  handler.ErrorResponse
// @Failure      500   {object}  handler.ErrorResponse
// @Router       /users/{id} [put]
func (h *UserHandler) UpdateUser(c *gin.Context) {
    id := c.Param("id")
    
    var user domain.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
        return
    }
    
    if err := h.userService.UpdateUser(c.Request.Context(), id, &user); err != nil {
        if err == domain.ErrUserNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
            return
        }
        if err == domain.ErrInvalidInput {
            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input or email already exists"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    updatedUser, err := h.userService.GetUser(c.Request.Context(), id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, updatedUser)
}

// DeleteUser godoc
// @Summary      Delete a user
// @Description  Remove a user by ID
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        id   path      string  true  "User ID"
// @Success      204  {object}  nil
// @Failure      404  {object}  handler.ErrorResponse
// @Failure      500  {object}  handler.ErrorResponse
// @Router       /users/{id} [delete]
func (h *UserHandler) DeleteUser(c *gin.Context) {
    id := c.Param("id")
    
    if err := h.userService.DeleteUser(c.Request.Context(), id); err != nil {
        if err == domain.ErrUserNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.Status(http.StatusNoContent)
}

// Login godoc
// @Summary      Login user
// @Description  Authenticate a user with email and password
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        credentials  body      object  true  "Login credentials"
// @Param        email        body      string  true  "User email" example:"user@example.com"
// @Param        password     body      string  true  "User password" example:"password123"
// @Success      200  {object}  object{token=string,user=domain.User}
// @Failure      400  {object}  handler.ErrorResponse
// @Failure      401  {object}  handler.ErrorResponse
// @Router       /login [post]
func (h *UserHandler) Login(c *gin.Context) {
    var credentials struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    
    if err := c.ShouldBindJSON(&credentials); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
        return
    }
    
    user, err := h.userService.Authenticate(c.Request.Context(), credentials.Email, credentials.Password)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
        return
    }
    
    // Em uma aplicação real, aqui seria gerado um token JWT
    response := struct {
        User  *domain.User `json:"user"`
        Token string       `json:"token"`
    }{
        User:  user,
        Token: "dummy-token", // Em uma aplicação real, seria um JWT válido
    }
    
    c.JSON(http.StatusOK, response)
}

// RegisterRoutes registra as rotas no router do Gin
func (h *UserHandler) RegisterRoutes(router *gin.RouterGroup) {
    users := router.Group("/users")
    {
        users.GET("/:id", h.GetUser)
        users.GET("", h.ListUsers)
        users.POST("", h.CreateUser)
        users.PUT("/:id", h.UpdateUser)
        users.DELETE("/:id", h.DeleteUser)
    }
    
    router.POST("/login", h.Login)
}
