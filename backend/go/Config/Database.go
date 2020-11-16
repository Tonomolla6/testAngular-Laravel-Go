package Config

import (
	"fmt"

	"github.com/jinzhu/gorm"
)



// import (
// 	"context"
// 	"fmt"
// 	"log"
// 	"time"
 
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// 	"go.mongodb.org/mongo-driver/mongo/readpref"
// )

// func main(){
// 	client, err := mongo.NewClient(options.Client().ApplyURI(<<MongoDB Connection URI>>))
//     if err != nil {
//         log.Fatal(err)
//     }
//     ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
//     err = client.Connect(ctx)
//     if err != nil {
//             log.Fatal(err)
//     }
//     defer client.Disconnect(ctx)

// fmt.Println("Connected to MongoDB!");

// // collection := client.Database("conduit_nodejs").Collection("articles")
// }








var DB *gorm.DB

// DBConfig represents db configuration
type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
}

func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "localhost",
		Port:     3306,
		User:     "xema",
		Password: "123456789",
		DBName:   "first_go",
	}
	return &dbConfig
}
// func BuildDBConfig() *DBConfig {
// 	dbConfig := DBConfig{
// 		Host:     "localhost",
// 		Port:     27017,
// 		DBName:   "go_angular",
// 	}
// 	return &dbConfig
// }

func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}
