package common

import (
	"github.com/go-redis/redis/v8"
	"context"
	
)
//"fmt"
var ctx = context.Background()

//S_Users :  Struct of the redis package
type S_Users struct{
	Key   string `json:"key"   binding:"required"`
	Value string `json:"value" binding:"required"`
}

//NewClient :  Creates a new client to use Redis
func NewClient() *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})

	return rdb 
}

func SaveUser(key string, value string, client *redis.Client) error {

	err := client.Set(ctx,"email", key, 0).Err()
	// err2 := client.Set(ctx,"token", token, 0).Err()
	if err != nil {
		return err
	}
	return nil
}

// func GetUser(client *redis.Client) string{
// 	email := client.Get("email").Result()

// 	if email != nil{
// 		return email
// 	}
// 	return nil
// }