package tree_sitter_jaamsim_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jaamsim "github.com/goiosunsw/tree-sitter-jaamsim/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jaamsim.Language())
	if language == nil {
		t.Errorf("Error loading Jaamsim grammar")
	}
}
