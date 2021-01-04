package events

import (
	"fmt"
	"errors"
	"goApp/common"
	"github.com/gin-gonic/gin"
	"net/http"
)

//fmt para debug


func EventsRegister(router *gin.RouterGroup) {
	router.POST("/", EventCreate)
	// router.PUT("/:id", EventUpdate)
	router.DELETE("/:id", EventDelete)
}

func EventsAnonymousRegister(router *gin.RouterGroup) {
	router.GET("/", EventList)
	router.GET("/:id", EventById)  
	
}



func EventCreate(c *gin.Context){
	var event Events
	c.BindJSON(&event);

	
	err:=CreateEvent(&event)

	if err !=nil{
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		c.JSON(http.StatusOK, gin.H{"event":event})
		return
	}
}


//List Events
func EventList(c *gin.Context) {
	fmt.Println("Dentro de EVENT LIST");
	var event []Events

	//Busca los events y mete el resultado en la var event
	err := GetAllEvents(&event)

	fmt.Println("EVENTS::::");
	fmt.Println(event);
	
	if err != nil {
		c.JSON(http.StatusOK, "Not found")
		c.AbortWithStatus(http.StatusNotFound)
	}else{
		// c.JSON(http.StatusOK, event)
		// serializer := EventsSerializer
		// c.JSON(http.StatusOK, gin.H{"events":eventModel})
		c.JSON(http.StatusOK, gin.H{"events": event})
	}
}

///////// Find ONE
func EventById(c *gin.Context) {
	id := c.Params.ByName("id")	

	var event Events
	err := GetEventById(&event, id)
	
	if err != nil {
		c.JSON(http.StatusOK, "Event Not Found")
		c.AbortWithStatus(http.StatusNotFound)
		return
	}else{
		c.JSON(http.StatusOK, gin.H{"event": event})
		return
	}
	// serializer := EventSerializer{c, eventModel}     //Serializer para enviarlo a angular?
	// c.JSON(http.StatusOK, gin.H{"event": serializer.Response()})
}
////////

//UPDATE event

// func EventUpdate(c *gin.Context){
// 	var event Events
// 	var newEvent Events
// 	c.BindJSON(&newEvent);  //Aqui en teoria está la event que le hemos pasado por postman

// 	id := c.Params.ByName("id")
// 	err := GetEventById(&event, id) //Este es la event que he pillao con ese id, ¿para que? para comprobar que existe ese id

// 	event.Name = newEvent.Name
// 	event.Company = newEvent.Company
// 	event.Events = newEvent.Events


// 	if err != nil { 
// 		c.JSON(http.StatusNotFound, "NOT FOUND")
// 	}else{ 
// 		c.BindJSON(&event)
// 		err = UpdateEvent(&event)//&event  Aqui hay que meterle la event nueva, con el c.BingJSON pero no me hace el json de la nueva
// 		if err != nil {
// 			c.JSON(http.StatusOK, "Not found")
// 			c.AbortWithStatus(http.StatusNotFound)
// 		} else {
// 			c.JSON(http.StatusOK, gin.H{"event": event})
// 			return
// 		}
// 	}

// }


//DELETE event
func EventDelete(c *gin.Context){
	var event Events
	id := c.Params.ByName("id")

	err := DeleteEvent(&event, id)

	if err != nil{
		c.JSON(http.StatusNotFound, common.NewError("events", errors.New("Invalid id")))
		return
	} 

	c.JSON(http.StatusOK, gin.H{"event": "Delete Event"})

}





