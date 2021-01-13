package discotecas

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/dgrijalva/jwt-go/request"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	// "encoding/json"
)

// Strips 'TOKEN ' prefix from token string
func stripBearerPrefixFromTokenString(tok string) (string, error) {
	// Should be a bearer token
	fmt.Println("BEARERr2: ",tok)
	fmt.Println("len: ", len(tok))
	fmt.Println("strings: ",strings.ToUpper(tok[0:7]))
	if len(tok) > 6 && strings.ToUpper(tok[0:7]) == "BEARER " {
		return tok[7:], nil
	}else{
		fmt.Println("ELSE")
	}
	fmt.Println("TOK DESPUES: ",tok)
	return tok, nil
}
 
//CREAR FUNCION QUE RECIBA EL TOKEN Y LO DECRIPTE
func DecriptToken(tok string) string{
	secret := common.NBSecretPassword
	fmt.Println("secret: ",secret)
	fmt.Println("token encriptado: ",tok)

	// decoded, err := base64.URLEncoding.DecodeString(src)

	// user_id := tok.getKeyId();
	// fmt.Println(user_id)
	// DecodedJWT jwt = JWT.decode(tok);
	// var user UserModel
	// err := json.NewDecoder(tok).Decode(&user)
	// user := jwt.Decode(,"tok")
	fmt.Println("USER DECODIFICAOOOO")
	// fmt.Println(user)
	return "OKAY"
}

// Extract  token from Authorization header
// Uses PostExtractionFilter to strip "TOKEN " prefix from header
var AuthorizationHeaderExtractor = &request.PostExtractionFilter{
	request.HeaderExtractor{"Authorization"},
	stripBearerPrefixFromTokenString,
}

// Extractor for OAuth2 access tokens.  Looks in 'Authorization'
// header then 'access_token' argument for a token.
var MyAuth2Extractor = &request.MultiExtractor{
	AuthorizationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}

// A helper to write user_id and user_model to the context
func UpdateContextUserModel(c *gin.Context, my_user_id uint) {
	fmt.Println("DEntro del context User Model (Discotecas--)")
	// fmt.Println(my_user_id)
	var myUserModel UserModel
	if my_user_id != 0 {
		db := common.GetDB()
		db.First(&myUserModel, my_user_id)
	}
	c.Set("my_user_id", my_user_id)
	c.Set("my_user_model", myUserModel)
}

// You can custom middlewares yourself as the doc: https://github.com/gin-gonic/gin#custom-middleware
//  r.Use(AuthMiddleware(true))

//ESTO DECODIFICA EL TOKEN POR AUTORITATION en postman DEL HEADER en angular
func AuthMiddleware(auto401 bool) gin.HandlerFunc { //Authmidelware true or false desde el main.go
	fmt.Println("Dentro del authmidelware")
	return func(c *gin.Context) {
		UpdateContextUserModel(c, 0)
		token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := ([]byte(common.NBSecretPassword)) //Aqui está el secret
			return b, nil
		})
		if err != nil {
			if auto401 {
				c.AbortWithError(http.StatusUnauthorized, err)
			}
			return
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			my_user_id := uint(claims["id"].(float64))
			//fmt.Println(my_user_id,claims["id"])
			UpdateContextUserModel(c, my_user_id)
		}
	}
}
