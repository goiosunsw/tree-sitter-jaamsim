module.exports = grammar({
  name: "jaamsim",

  extras: $ => [/[\s\n\t]/, $.comment],

  rules: {
    program: $ => repeat(choice(
      $.rec_decl,
      $.include_stat,
      $.define_stat,
      $.comment,
      $.sentence
    )),

    comment: $ => token(seq('#', /.*/)),
    junk: $ => /[^%@\s\n\t][^%@]*/,
    rec_decl: $ => "RecordEdits",
    include_stat: $ => seq("include", $.path),
    define_stat: $ => seq("Define", $.obj_type, $._obj_list),

    obj_type: $ => /[A-Z][A-Za-z]*/,
    _obj_list: $ => seq("{", repeat1($.object), "}"),

    sentence: $ => seq(
      $._subj, 
      repeat1($._prop_val),"\n"),
    _prop_val: $ => seq($.property, $._val_sent),

    _subj: $ => choice( $.object, $._obj_prop),

    object: $ => /[A-Za-z_][A-Za-z0-9_()-]*/,
    _obj_prop: $ => seq($.object, ".", $.property),
    this: $ => "this",
    property: $ => /[A-Za-z_][A-Za-z0-9_()]*/,
    _val_sent: $ => choice($._empty_val, $._val_exp),
    _val_exp: $ => choice(
      $._dim_list,
      seq("{", repeat1($.value), "}"),
    ),

    _dim_list: $ => prec(7,seq("{", repeat1($.number), $.unit, "}")),

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
    number: $ => /-?[0-9]+\.?[0-9]*/,
    bool: $ => choice("TRUE", "FALSE"),
    string: $ => /\'[^']*\'/,

    entity_attribute: $ => seq($._obj_or_this, ".", $.property),
    _obj_or_this: $ => choice($._obj_delim, $.this),
    _obj_delim: $ => seq("[", $.object, "]"),

    expr: $ => prec(3,seq($.object, $._obj_delim)),

    list: $ => choice(
      prec(5,seq("{", repeat($.value), "}"))
    ),

    unit : $ => choice(
      /\[?[A-Za-z]+\]?/,
      /\[?[A-Za-z]+\/[A-Za-z]+\]?/),
    path: $ => /[A-Za-z0-9._/<>-]+/,
    empty: $ => /[ \t]*/
  }
});
