// $('img').mouseover(function() {
//   $(this).attr({
//     src:'https://cdn.glitch.com/46a240eb-89aa-42f6-acf0-3366cb3df7cc%2FWeb-Dev-1.png?1519734320608'
//   });
// });

// $('img').mouseout(function() {
//   $(this).attr({
//     src: 'https://cdn.glitch.com/46a240eb-89aa-42f6-acf0-3366cb3df7cc%2FHTML5_CSS_JavaScript.png?1519734056086'
//   });
// });

$("#delplaylist").click(function() {
  return confirm('Really delete that category?');
});

$("#delsong").click(function() {
  return confirm('Really delete this resource?');
});
