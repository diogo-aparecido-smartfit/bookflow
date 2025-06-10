package usecase

import (
    "context"
    "time"

    "github.com/google/uuid"
    "golang.org/x/crypto/bcrypt"

    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/domain"
    "github.com/diogo-aparecido-smartfit/bookflow/backend/internal/repository"
)

type UserService struct {
    userRepo repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) *UserService {
    return &UserService{
        userRepo: userRepo,
    }
}

func (s *UserService) GetUser(ctx context.Context, id string) (*domain.User, error) {
    return s.userRepo.FindByID(ctx, id)
}

func (s *UserService) ListUsers(ctx context.Context, page, pageSize int) ([]*domain.User, error) {
    if page < 1 {
        page = 1
    }
    if pageSize < 1 || pageSize > 100 {
        pageSize = 10
    }
    
    offset := (page - 1) * pageSize
    return s.userRepo.FindAll(ctx, pageSize, offset)
}

func (s *UserService) CreateUser(ctx context.Context, user *domain.User) error {
    if user.Name == "" || user.Email == "" || user.Password == "" {
        return domain.ErrInvalidInput
    }
    
    existingUser, err := s.userRepo.FindByEmail(ctx, user.Email)
    if err == nil && existingUser != nil {
        return domain.ErrInvalidInput
    }
    
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    
    user.ID = uuid.New().String()
    now := time.Now()
    user.CreatedAt = now
    user.UpdatedAt = now
    user.Password = string(hashedPassword)
    
    return s.userRepo.Create(ctx, user)
}

func (s *UserService) UpdateUser(ctx context.Context, id string, user *domain.User) error {
    existingUser, err := s.userRepo.FindByID(ctx, id)
    if err != nil {
        return err
    }
    
    if user.Name != "" {
        existingUser.Name = user.Name
    }
    
    if user.Email != "" && user.Email != existingUser.Email {
        userWithEmail, err := s.userRepo.FindByEmail(ctx, user.Email)
        if err == nil && userWithEmail != nil {
            return domain.ErrInvalidInput
        }
        existingUser.Email = user.Email
    }
    
    if user.Password != "" {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
        if err != nil {
            return err
        }
        existingUser.Password = string(hashedPassword)
    }
    
    existingUser.UpdatedAt = time.Now()
    
    return s.userRepo.Update(ctx, existingUser)
}

func (s *UserService) DeleteUser(ctx context.Context, id string) error {
    return s.userRepo.Delete(ctx, id)
}

func (s *UserService) Authenticate(ctx context.Context, email, password string) (*domain.User, error) {
    user, err := s.userRepo.FindByEmail(ctx, email)
    if err != nil {
        return nil, domain.ErrUserNotFound
    }
    
    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
    if err != nil {
        return nil, domain.ErrInvalidInput
    }
    
    return user, nil
}