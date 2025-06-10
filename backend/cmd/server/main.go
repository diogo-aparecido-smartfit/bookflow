package main

import (
    "log"

    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"

    // Import the generated docs
    _ "github.com/diogo-aparecido-smartfit/bookflow/backend/docs"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/handler"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/infra/config"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/infra/database"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository/postgres"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/usecase"
)

// @title           BookFlow API
// @version         1.0
// @description     A book management service API
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.bookflow.com/support
// @contact.email  support@bookflow.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api

// @securityDefinitions.apikey Bearer
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
func main() {
    // Carregar configurações
    cfg, err := config.Load()
    if err != nil {
        log.Fatalf("Failed to load config: %v", err)
    }

    // Conectar ao banco de dados (Singleton)
    db, err := database.NewPostgresConnection(cfg.Database)
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }
    
    bookRepo := postgres.NewBookRepository(db)
    userRepo := postgres.NewUserRepository(db)
    
    bookService := usecase.NewBookService(bookRepo)
    userService := usecase.NewUserService(userRepo)
    
    bookHandler := handler.NewBookHandler(bookService)
    userHandler := handler.NewUserHandler(userService)

    healthHandler := handler.NewHealthHandler(db)
    
    router := gin.Default()
    
    router.Use(handler.CORSMiddleware())
    
    router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    
    api := router.Group("/api")
    {
        bookHandler.RegisterRoutes(api)
        userHandler.RegisterRoutes(api)
        healthHandler.RegisterRoutes(api)
    }
    
    log.Printf("Starting server on %s", cfg.Server.Address)
    if err := router.Run(cfg.Server.Address); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}