package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

func main() {
	m := make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}

	fmt.Println(m)
	fmt.Println(m["Bell Labs"])

	m2 := make(map[string]int)

	m2["Answer"] = 42
	fmt.Println("The value:", m2["Answer"])

	m2["Answer"] = 48
	fmt.Println("The value:", m2["Answer"])

	delete(m2, "Answer")
	fmt.Println("The value:", m2["Answer"])

	elem, ok := m2["Answer"]
	fmt.Println("The value:", elem, "Present?", ok)
}