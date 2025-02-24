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
      $._val_sent),

    _subj: $ => choice($.define, $.object, $._obj_prop),
    define: $ => "Define",

    object: $ => /[A-Za-z_][A-Za-z0-9_-]*/,
    _obj_prop: $ => seq($.object, ".", $.property),
    this: $ => "this",
    property: $ => /[A-Za-z_][A-Za-z0-9_]*/,
    _val_sent: $ => choice($._empty_val, $._val_exp),
    _val_exp: $ => choice(
      prec(5,seq("{", repeat1($.value), "}")),
      prec(1,$._dim_list)
    ),

    _dim_list: $ => seq("{", repeat1($.number), $.unit, "}"),

    _empty_val: $ => seq("{", "}"),
    
    value: $ => prec(2,choice(
      $.number,
      $.bool,
      $.string,
      $.object,
      $.entity_attribute,
      $.list,
      $.expr,
      $.path,
    )),
    number: $ => /[0-9.-]+/,
    bool: $ => choice("TRUE", "FALSE"),
    string: $ => /\'[^']*\'/,

    entity_attribute: $ => seq($._obj_or_this, ".", $.property),
    _obj_or_this: $ => choice($._obj_delim, $.this),
    _obj_delim: $ => seq("[", $.object, "]"),

    expr: $ => prec(3,seq($.object, $._obj_delim)),

    list: $ => choice(
      prec(5,seq("{", repeat($.value), "}"))
    ),

    unit : $ => /\[?[A-Za-z]+\]?/,
    path: $ => /[A-Za-z0-9._/<>-]+/,
    empty: $ => /[ \t]*/
  }
});
