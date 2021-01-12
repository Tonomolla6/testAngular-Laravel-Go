package discotecas

import (
	"fmt"
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	"io/ioutil"
	
)

//"fmt"    "encoding/json"  
// "strconv" para los coments
//	"io" "strings"
//	



func DiscotecasRegister(router *gin.RouterGroup) {
	router.POST("/", DiscotecaCreate)
	router.PUT("/:id", DiscotecaUpdate)
	router.DELETE("/:id", DiscotecaDelete)
	router.POST("/:id/favorite", DiscotecaFavorite)
	// router.DELETE("/:id/favorite", DiscotecaUnfavorite)
	// router.POST("/:id/comments", DiscotecaCommentCreate)
	// router.DELETE("/:id/comments/:id", DiscotecaCommentDelete)
}

func DiscotecasAnonymousRegister(router *gin.RouterGroup) {
	router.GET("/", DiscotecaList)
	router.GET("/:id", DiscotecaById)  
	
}

// router.GET("/:id/comments", DiscotecaCommentList)

func DiscotecaCreate(c *gin.Context){
	var discoteca Discotecas
	c.BindJSON(&discoteca);

	
	err:=CreateDiscoteca(&discoteca)

	if err !=nil{
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		c.JSON(http.StatusOK, gin.H{"discoteca":discoteca})
		return
	}
}


//List Discotecas
func DiscotecaList(c *gin.Context) {
	var discoteca []Discotecas

	//Busca las discotecas y mete el resultado en la var discoteca
	err := GetAllDiscotecas(&discoteca)
	
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		// c.JSON(http.StatusOK, discoteca)
		// serializer := DiscotecasSerializer
		// c.JSON(http.StatusOK, gin.H{"discotecas":discotecaModel})
		c.JSON(http.StatusOK, gin.H{"discotecas": discoteca})
	}
}

///////// Find ONE
func DiscotecaById(c *gin.Context) {
	id := c.Params.ByName("id")	

	var discoteca Discotecas
	err := GetDiscotecaById(&discoteca, id)
	
	if err != nil {
		c.JSON(http.StatusOK, "Discoteca Not Found")
		c.AbortWithStatus(http.StatusNotFound)
		return
	}else{
		c.JSON(http.StatusOK, gin.H{"discoteca": discoteca})
		return
	}
	// serializer := DiscotecaSerializer{c, discotecaModel}     //Serializer para enviarlo a angular?
	// c.JSON(http.StatusOK, gin.H{"discoteca": serializer.Response()})
}
////////

//UPDATE discoteca

func DiscotecaUpdate(c *gin.Context){
	var discoteca Discotecas
	var newDiscoteca Discotecas
	c.BindJSON(&newDiscoteca);  //Aqui en teoria está la discoteca que le hemos pasado por postman

	id := c.Params.ByName("id")
	err := GetDiscotecaById(&discoteca, id) //Este es la discoteca que he pillao con ese id, ¿para que? para comprobar que existe ese id

	discoteca.Name = newDiscoteca.Name
	discoteca.Company = newDiscoteca.Company
	// discoteca.Events = newDiscoteca.Events


	if err != nil { 
		c.JSON(http.StatusNotFound, "NOT FOUND")
	}else{ 
		c.BindJSON(&discoteca)
		err = UpdateDiscoteca(&discoteca)//&discoteca  Aqui hay que meterle la discoteca nueva, con el c.BingJSON pero no me hace el json de la nueva
		if err != nil {
			c.JSON(http.StatusOK, "Not found")
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, gin.H{"discoteca": discoteca})
			return
		}
	}

}


//DELETE discoteca
func DiscotecaDelete(c *gin.Context){
	var discoteca Discotecas
	id := c.Params.ByName("id")

	err := DeleteDiscoteca(&discoteca, id)

	if err != nil{
		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid id")))
		return
	} 

	c.JSON(http.StatusOK, gin.H{"discoteca": "Delete Discoteca"})

}


//////Favorite

func DiscotecaFavorite(c *gin.Context) {
	fmt.Println("Dentro de router favavsdvorite");
	// fmt.Println(c.Params.ByName("id"))
	id := c.Params.ByName("id")

	fmt.Println("Antes del get")

	// var email = "xema_test@gmail.com"
	var discoteca Discotecas
	// err := GetDiscotecaById(&discoteca, id)
	// var discotecaModel Discotecas
	err := GetDiscotecaById(&discoteca, id)//Discoteca a la que le damos like
	if err != nil {
		c.JSON(http.StatusNotFound, common.NewError("discotecas", errors.New("Invalid id")))
		return
	}
	fmt.Println("DISCOTECA TO FAV")
	fmt.Println(discoteca)

	client := common.NewClient()
	var email = common.GetUser("email", client)
	fmt.Println("email del USER que ha dado like")
	fmt.Println(email)

	var email_a_piñon = "admin"


	//Fetch request
	//https://api.github.com/users/j-maestre/followers
	// resp, err := http.Get("http://users.docker.localhost/api/user/logued")
    // if err != nil {
    //     print(err)
    // }
    // defer resp.Body.Close()
    // body, err := ioutil.ReadAll(resp.Body)
    // if err != nil {
    //     print(err)
    // }
	// fmt.Print(string(body))
	//End fetch request


	// c.JSON(http.StatusOK, gin.H{"discoteca": discoteca})
}



// func queryParams(w http.ResponseWriter, r *http.Request) {
//     for k, v := range r.URL.Query() {
//         fmt.Printf("%s: %s\n", k, v)
//     }
// }