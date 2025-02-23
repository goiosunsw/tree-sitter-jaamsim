import XCTest
import SwiftTreeSitter
import TreeSitterJaamsim

final class TreeSitterJaamsimTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_jaamsim())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Jaamsim grammar")
    }
}
