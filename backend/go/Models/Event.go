package Models

import (
	"5_go_mysql/Config"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

//GetAllEvents Fetch all event data
func GetAllEvents(event *[]Event) (err error) {
	if err = Config.DB.Find(event).Error; err != nil {
		return err
	}
	return nil
}

//CreateEvent ... Insert New data
func CreateEvent(event *Event) (err error) {
	if err = Config.DB.Create(event).Error; err != nil {
		return err
	}
	return nil
}

//GetEventByID ... Fetch only one event by Id
func GetEventByID(event *Event, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(event).Error; err != nil {
		return err
	}
	return nil
}

//UpdateEvent ... Update event
func UpdateEvent(event *Event, id string) (err error) {
	fmt.Println(event)
	Config.DB.Save(event)
	return nil
}

//DeleteEvent ... Delete event
func DeleteEvent(event *Event, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(event)
	return nil
}
