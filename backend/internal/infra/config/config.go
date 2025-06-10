package config

import (
    "github.com/spf13/viper"
)

// Config representa a configuração da aplicação
type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    Env      string
}

// ServerConfig representa a configuração do servidor
type ServerConfig struct {
    Address string
}

// DatabaseConfig representa a configuração do banco de dados
type DatabaseConfig struct {
    Host     string
    Port     string
    User     string
    Password string
    DBName   string
    SSLMode  string
}

// Load carrega as configurações do ambiente
func Load() (*Config, error) {
    viper.SetConfigFile(".env")
    
    if err := viper.ReadInConfig(); err != nil {
        viper.SetDefault("SERVER_PORT", "8080")
        viper.SetDefault("DB_HOST", "localhost")
        viper.SetDefault("DB_PORT", "5432")
        viper.SetDefault("DB_USER", "postgres")
        viper.SetDefault("DB_PASSWORD", "postgres")
        viper.SetDefault("DB_NAME", "bookflow")
        viper.SetDefault("DB_SSLMODE", "disable")
        viper.SetDefault("ENV", "development")
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return nil, err
        }
    }
    
    viper.AutomaticEnv()
    
    return &Config{
        Server: ServerConfig{
            Address: ":" + viper.GetString("SERVER_PORT"),
        },
        Database: DatabaseConfig{
            Host:     viper.GetString("DB_HOST"),
            Port:     viper.GetString("DB_PORT"),
            User:     viper.GetString("DB_USER"),
            Password: viper.GetString("DB_PASSWORD"),
            DBName:   viper.GetString("DB_NAME"),
            SSLMode:  viper.GetString("DB_SSLMODE"),
        },
        Env: viper.GetString("ENV"),
    }, nil
}
