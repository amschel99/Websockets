(function () {

  var container = document.getElementById('innerContainer')

  container.maxScrollTop = container.scrollHeight - container.offsetHeight

  document.getElementById('send').addEventListener('click', function () {

    if (container.maxScrollTop - container.scrollTop <= container.offsetHeight) {
      // We can scroll to the bottom.
      // Setting scrollTop to a high number will bring us to the bottom.
      // setting its value to scrollHeight seems a good idea, because
      // scrollHeight is always higher than scrollTop.
      // However we could use any value (e.g. something like 99999 should be ok) 
      container.scrollTop = container.scrollHeight
      console.log("I just scrolled to the bottom!")

    } else {
      console.log("I won't scroll: you're way too far from the bottom!\n" +
      "You should maybe alert the user that he received a new message.\n" +
      "If he wants to scroll at this point, he must do it manually.")
    }

  }, false)


  // Logging stuff in the console. You can call this for debugging purposes.
  function debug() {
    // scrollTop gets or sets the number of pixels
    // that the content of an element is scrolled upward.
    console.log('scrollTop', container.scrollTop)

    // scrollHeight is the height of the scroll view of an element 
    // (in other words, the whole content's height). 
    // It includes the element padding but not its margin.
    console.log('scrollHeight', container.scrollHeight)

    // offsetHeight is the height of an element relative to 
    // the element's offsetParent. 
    // In other words, it's the viewport, and it's constant.
    // clientHeight is the same, but you shouldn't use it, 
    // because it's not part of any standard.
    console.log('offsetHeight', container.offsetHeight)

    // maxScrollTop is the maximum value that scrollTop can assume.
    // We are defining it as a constant, but you can as well put it in a function
    // in case the viewport's height (offsetHeight) is variable.
    console.log('maxScrollTop', container.maxScrollTop)

    // offsetParent returns a reference to the object which is the closest 
    // (nearest in the containment hierarchy) positioned containing element.
    // I actually don't need this for the demo, 
    // but it may be useful in some cases.
    // console.log(container.offsetParent)
  }

})();