module.exports = grammar({
  name: "jaamsim",

  extras: $ => [/[\s\n\t]/, $.comment],

  rules: {
    program: $ => repeat(choice(
      $.rec_decl,
      $.comment,
      $.sentence
    )),

    comment: $ => token(seq('#', /.*/)),
    junk: $ => /[^%@\s\n\t][^%@]*/,
    rec_decl: $ => "RecordEdits",

    sentence: $ => seq(
      $._subj, 
      $.property, 
      $._val_exp),

    _subj: $ => choice($.define, $.object),
    define: $ => "Define",

    object: $ => /[A-Za-z_][A-Za-z0-9_-]*/,
    this: $ => "this",
    property: $ => /[A-Za-z_][A-Za-z0-9_]*/,
    _val_exp: $ => prec(1,seq("{", repeat1($.value), "}")),

    value: $ => choice(
      $.number,
      $.bool,
      $.string,
      $.object,
      $.entity_attribute,
      $.list,
      $.path
    ),
    number: $ => /[0-9.-]+/,
    bool: $ => choice("TRUE", "FALSE"),
    string: $ => /\'[^']*\'/,
    entity_attribute: $ => seq($._obj_or_this, ".", $.property),
    _obj_or_this: $ => choice($._obj_delim, $.this),
    _obj_delim: $ => seq("[", $.object, "]"),
    list: $ => seq("{", repeat($.value), "}"),
    path: $ => /[A-Za-z0-9._/-]+/
  }
});
