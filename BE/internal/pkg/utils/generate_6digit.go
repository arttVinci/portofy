package utils

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func Generate6Digit() (string, error) {
	value := big.NewInt(1000000)
	n, err := rand.Int(rand.Reader, value)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%06d", n.Int64()), nil
}
