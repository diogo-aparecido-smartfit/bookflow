package handler

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"
)

type HealthHandler struct {
    db *sqlx.DB
}

func NewHealthHandler(db *sqlx.DB) *HealthHandler {
    return &HealthHandler{
        db: db,
    }
}

func (h *HealthHandler) HealthCheck(c *gin.Context) {
    err := h.db.Ping()
    if err != nil {
        c.JSON(http.StatusServiceUnavailable, gin.H{
            "status":  "error",
            "message": "Database connection failed",
            "error":   err.Error(),
        })
        return
    }

    var tableExists bool
    err = h.db.QueryRow("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'books')").Scan(&tableExists)
    
    if err != nil || !tableExists {
        c.JSON(http.StatusServiceUnavailable, gin.H{
            "status":  "error",
            "message": "Required tables don't exist",
            "error":   err.Error(),
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "status":  "ok",
        "message": "Service is healthy",
    })
}

func (h *HealthHandler) RegisterRoutes(router *gin.RouterGroup) {
    router.GET("/health", h.HealthCheck)
}