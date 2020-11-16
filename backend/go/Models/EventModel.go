package Models

type Event struct {
	Id        uint   `json:"id"`
	Name      string `json:"name"`
	Discoteca string `json:"discoteca"`
}

func (b *Event) TableName() string {
	return "event"
}
