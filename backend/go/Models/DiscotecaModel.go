package Models

type Discoteca struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Company string `json:"company"`
	Events  string `json:"events"`
}

func (b *Discoteca) TableName() string {
	return "discoteca"
}
