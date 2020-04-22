package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("%v\n", v)
	case string:
		fmt.Printf("%q is %v bytes\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}