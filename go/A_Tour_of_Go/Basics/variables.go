package main

import (
	"fmt"
	"reflect"
)

var c, python, java bool
var x, y int = 1, 2

func main() {
	var i int
	var a, b, d = true, false, "str"
	k := 3
	l := "str2"
	m := false
	fmt.Println(i, c, python, java)
	fmt.Println(x, y)
	fmt.Println(a, b, d)
	fmt.Println(k, l, m)
	fmt.Println(reflect.TypeOf(k), reflect.TypeOf(l), reflect.TypeOf(m))
}