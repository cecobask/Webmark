$(".delbookmark").click(function() {
  return confirm('Really delete this category?');
});

$(".delresource").click(function() {
  return confirm('Really delete this resource?');
});

$(".delcomment").click(function() {
  return confirm('Really delete this comment?');
});

$("#authError").click(function() {
  return alert('Wrong email or password! Try again.');
});