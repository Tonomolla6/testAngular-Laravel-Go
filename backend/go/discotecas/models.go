package discotecas

type Discotecas struct {
	Id          uint
	Name        string   `json:"name"`
	Company     string   `json:"company"`
	Events      string   `json:"events"`
}