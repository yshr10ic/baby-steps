package main

import (
	"fmt"
	"math"
)

func Sqrt2(x float64) float64 {
	z := x
	for i := 0; i < 10; i++ {
		z -= (z * z - x) / (2 * z)
	}
	return z
}

func main() {
	fmt.Println(Sqrt2(2))
	fmt.Println(math.Sqrt(2))
}