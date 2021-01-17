package users

import (
	"fmt"
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"encoding/json"
	"bytes"
	"io/ioutil"
)
//"strings" "fmt"

//Register o Login
func UsersRegister(router *gin.RouterGroup) {
	router.POST("/", UsersRegistration)
	router.POST("/login", UsersLogin)
}

//Get user o Update user
func UserRegister(router *gin.RouterGroup) {
	router.GET("/", UserRetrieve)
	router.PUT("/", UserUpdate)
	router.GET("/logued", GetLoguedUser)
}

//GETUSER, Follow o Unfollow
func ProfileRegister(router *gin.RouterGroup) {
	router.GET("/:username", ProfileRetrieve)
	router.POST("/:username/follow", ProfileFollow)
	router.DELETE("/:username/follow", ProfileUnfollow)
}

func GetLoguedUser(c *gin.Context) {
	fmt.Println("--------------------------------------------------------------------------------------")
	client := common.NewClient()
	email :=  common.GetUser("email", client)


	// prueba, err := request.ParseFromRequest(c.Request) 
	// fmt.Println(prueba)
	userModel, err := FindOneUser(&User{Email: email})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid email")))
		return
	}
	// return userModel
	profileSerializer := ProfileSerializer{c,userModel}
	// c.JSON(http.StatusOK, gin.H{"profile": profileSerializer.Response()})

	// fmt.Println("GET LOGUED USER",profileSerializer.Response())
	c.JSON(0,gin.H{"User":profileSerializer.Response()})
}

func ProfileRetrieve(c *gin.Context) {
	fmt.Println("PROFILE RETRIEVE")
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	// fmt.Println("USER MODEEEEEEEELLLLLLL")
	// fmt.Println(userModel)
	profileSerializer := ProfileSerializer{c,userModel}
	c.JSON(http.StatusOK, gin.H{"profile": profileSerializer.Response()})
}

func ProfileFollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUserModel := c.MustGet("my_user_model").(User)
	err = myUserModel.following(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

func ProfileUnfollow(c *gin.Context) {
	username := c.Param("username")
	userModel, err := FindOneUser(&User{Username: username})
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid username")))
		return
	}
	myUserModel := c.MustGet("my_user_model").(User)

	err = myUserModel.unFollowing(userModel)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	serializer := ProfileSerializer{c, userModel}
	c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}

//REGISTER
func UsersRegistration(c *gin.Context) {
	userModelValidator := NewUserModelValidator()  //Esto es lo que valida sintactica y semanticamente en validators.go
	
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	userModelValidator.userModel.Type = "client";
	if err := SaveOne(&userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}

	//Crear profile

	// fmt.Println("ID DEL USER CREADO")
	// fmt.Println(userModelValidator.userModel.ID)

	id := userModelValidator.userModel.ID;
	requestBody, err := json.Marshal(map[string]uint{
		"user_id": id,
	})

	if err!=nil{
		fmt.Println("ERROR MARSHAL")
	}

	resp, err := http.Post("http://profile.docker.localhost/api/profile","application/json",bytes.NewBuffer(requestBody))

	if err !=nil{
		fmt.Println("ERROR MARSHAL2")
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err!=nil{
		fmt.Println("ERROR MARSHAL3")
	}

	fmt.Println(string(body))
	// prueba := json.RawMessage(`{"user_id": `+userModelValidator.userModel.ID+`}`)


	//Fin crear profile



	c.Set("my_user_model", userModelValidator.userModel)
	serializer := UserSerializer{c}
	c.JSON(http.StatusCreated, gin.H{"user": serializer.Response()})
}


//LOGIN
func UsersLogin(c *gin.Context) {
	loginValidator := NewLoginValidator()
	if err := loginValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}
	userModel, err := FindOneUser(&User{Email: loginValidator.userModel.Email})

	if err != nil {
		c.JSON(http.StatusForbidden, common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}

	if userModel.checkPassword(loginValidator.User.Password) != nil {
		c.JSON(http.StatusForbidden, common.NewError("login", errors.New("Not Registered email or invalid password")))
		return
	}
	UpdateContextUserModel(c, userModel.ID)  //Esto se guarda al tio que se ha logueado
	//save userModel in redis
	client := common.NewClient()
	serializer := UserSerializer{c}

	err_redis := common.SaveUser(serializer.Response().Email, serializer.Response().Bearer, client)
	if err_redis != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err_redis.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}


func UserRetrieve(c *gin.Context) {
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}

func UserUpdate(c *gin.Context) {
	myUserModel := c.MustGet("my_user_model").(User)
	userModelValidator := NewUserModelValidatorFillWith(myUserModel)
	if err := userModelValidator.Bind(c); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewValidatorError(err))
		return
	}

	userModelValidator.userModel.ID = myUserModel.ID
	if err := myUserModel.Update(userModelValidator.userModel); err != nil {
		c.JSON(http.StatusUnprocessableEntity, common.NewError("database", err))
		return
	}
	UpdateContextUserModel(c, myUserModel.ID)
	serializer := UserSerializer{c}
	c.JSON(http.StatusOK, gin.H{"user": serializer.Response()})
}
