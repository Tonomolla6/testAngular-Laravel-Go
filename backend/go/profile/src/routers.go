package profile

import (
	"fmt"
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
	
)
// "strconv" para los coments
//"fmt" para debug


func ProfilesRegister(router *gin.RouterGroup) {
	router.POST("/", ProfileCreate)
	router.PUT("/:id", ProfileUpdate)
	router.DELETE("/:id", ProfileDelete)
}

func ProfilesAnonymousRegister(router *gin.RouterGroup) {
	router.GET("/", ProfileList)
	router.GET("/:id", ProfileById)  
	
}

//CREATE
func ProfileCreate(c *gin.Context){
	fmt.Println("DENTRO DE CREATE PROFILE")
	var profile Profile
	c.BindJSON(&profile);

	err:=CreateProfile(&profile)

	if err !=nil{
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		c.JSON(http.StatusOK, gin.H{"profile":profile})
		return
	}
}


//List Profile
func ProfileList(c *gin.Context) {
	var profile []Profile

	//Busca las profile y mete el resultado en la var profile
	err := GetAllProfiles(&profile)
	
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		// c.JSON(http.StatusOK, profile)
		// serializer := ProfilesSerializer
		// c.JSON(http.StatusOK, gin.H{"profile":profileModel})
		c.JSON(http.StatusOK, gin.H{"profile": profile})
	}
}

///////// Find ONE
func ProfileById(c *gin.Context) {
	id := c.Params.ByName("id")	

	var profile Profile
	err := GetProfileById(&profile, id)
	
	if err != nil {
		c.JSON(http.StatusOK, "Profile Not Found")
		c.AbortWithStatus(http.StatusNotFound)
		return
	}else{
		c.JSON(http.StatusOK, gin.H{"profile": profile})
		return
	}
	// serializer := ProfileSerializer{c, profileModel}     //Serializer para enviarlo a angular?
	// c.JSON(http.StatusOK, gin.H{"profile": serializer.Response()})
}
////////

//UPDATE profile

func ProfileUpdate(c *gin.Context){
	var profile Profile
	var newProfile Profile
	c.BindJSON(&newProfile);  //Aqui en teoria está la profile que le hemos pasado por postman

	id := c.Params.ByName("id")
	err := GetProfileById(&profile, id) //Este es la profile que he pillao con ese id, ¿para que? para comprobar que existe ese id

	// profile.Name = newProfile.Name
	// profile.Company = newProfile.Company
	// profile.Events = newProfile.Events


	if err != nil { 
		c.JSON(http.StatusNotFound, "NOT FOUND")
	}else{ 
		c.BindJSON(&profile)
		err = UpdateProfile(&profile)//&profile  Aqui hay que meterle la profile nueva, con el c.BingJSON pero no me hace el json de la nueva
		if err != nil {
			c.JSON(http.StatusOK, "Not found")
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, gin.H{"profile": profile})
			return
		}
	}

}


//DELETE profile
func ProfileDelete(c *gin.Context){
	var profile Profile
	id := c.Params.ByName("id")

	err := DeleteProfile(&profile, id)

	if err != nil{
		c.JSON(http.StatusNotFound, common.NewError("profile", errors.New("Invalid id")))
		return
	} 

	c.JSON(http.StatusOK, gin.H{"profile": "Delete Profile"})

}





