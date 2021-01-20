package common

import (
	"fmt"
	"github.com/go-redis/redis/v8"
	"context"
	"strconv"
	"reflect"
	
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

func SaveUser(email string, value string, client *redis.Client) error {
	
	err := client.Set(ctx,"email", email, 0).Err()

	if err != nil {
		return err
	}
	return nil
}


func GetUser(key string, client *redis.Client) string {

	email, err := client.Get(ctx, key).Result() 

	if err != nil {
		fmt.Println("ERROR en GetUser de redis: ", err)
	}
	return email
}

func SaveUserLike(user uint, discoteca string, client *redis.Client) error{

	var newUsers []uint;

	//Pillamos el total de likes que tiene esa discoteca
	totalUsers, err2 := client.Get(ctx, discoteca).Result()

	fmt.Println(reflect.TypeOf(totalUsers))

	fmt.Println("TOTAL USERS REDIS LIKE- STRING---------", totalUsers)

	//Convertimos a formato uint64 el total de likes de la discoteca
	total, errConv := strconv.ParseUint(totalUsers, 10, 32)

	fmt.Println("TOTAL UINT: ", total)

	if errConv != nil{
		fmt.Println("Error parse uint redis")
	} 

	//Añadimos al array el total de likes en uint64 de esa discoteca
	newUsers = append(newUsers,uint(total))

	fmt.Println("TOTAL USERS REDIS: ",totalUsers)
	fmt.Println("Err: ", err2)

	//Machacamos los likes que tenia antes por el nuevo array con lo que habia antes mas el nuevo like
	err3 := client.Set(ctx,discoteca, newUsers, 0).Err()

	if err3 != nil {
		return err3
	}
	fmt.Println("Like de ", user ," a la discoteca ",discoteca," guardado en redis")
	return nil
}