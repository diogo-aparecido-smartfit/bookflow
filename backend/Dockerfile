# builder
FROM golang:1.24-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server ./cmd/server

# final
FROM alpine:3.19
WORKDIR /app

COPY --from=builder /app/server ./server
RUN ls -la /app

COPY --from=builder /app/migrations ./migrations
COPY .env ./

RUN chmod +x ./server
EXPOSE 8080
CMD ["./server"]
