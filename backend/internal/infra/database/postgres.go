package database

import (
	"fmt"
	"sync"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"

	"github.com/diogo-aparecido-smartfit/bookflow/backend/internal/infra/config"
)

var (
	instance *sqlx.DB
	once     sync.Once
)

func NewPostgresConnection(cfg config.DatabaseConfig) (*sqlx.DB, error) {
	var err error

	once.Do(func() {
		dsn := fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
			cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
		)

		db, e := sqlx.Connect("postgres", dsn)
		if e != nil {
			err = e
			return
		}

		db.SetMaxOpenConns(20)
		db.SetMaxIdleConns(5)

		if e = db.Ping(); e != nil {
			err = e
			return
		}

		instance = db
	})

	if err != nil {
		return nil, err
	}

	return instance, nil
}
