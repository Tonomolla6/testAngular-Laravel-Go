package Controllers

import (
	"5_go_mysql/Models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GetEvents ... Get all events
func GetEvents(c *gin.Context) {
	var event []Models.Event
	err := Models.GetAllEvents(&event)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, event)
	}
}

//CreateEvent ... Create Event
func CreateEvent(c *gin.Context) {
	var event Models.Event
	c.BindJSON(&event)
	err := Models.CreateEvent(&event)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, event)
	}
}

//GetEventByID ... Get the event by id
func GetEventByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var event Models.Event
	err := Models.GetEventByID(&event, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, event)
	}
}

//UpdateEvent ... Update the event information
func UpdateEvent(c *gin.Context) {
	var event Models.Event
	id := c.Params.ByName("id")
	err := Models.GetEventByID(&event, id)
	if err != nil {
		c.JSON(http.StatusNotFound, event)
	}
	c.BindJSON(&event)
	err = Models.UpdateEvent(&event, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, event)
	}
}

//DeleteEvent ... Delete the event
func DeleteEvent(c *gin.Context) {
	var event Models.Event
	id := c.Params.ByName("id")
	err := Models.DeleteEvent(&event, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
