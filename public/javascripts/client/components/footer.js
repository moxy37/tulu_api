function LoadFooter() {
	var html = '<ul class="footerList"><li class="footerListItem"><a href="/"><h4>About Us</h4></a></li><li class="footerListItem"><a href="/"><h4>Partners</h4></a><ul class="footerSubLinkList"><li class="SubLinkListItem"><a href="/">Dealerships</a></li></ul></li><li class="footerListItem"><a href="/"><h4>Customer Support</h4></a><ul class="footerSubLinkList"><li class="SubLinkListItem"><a href="/">FAQ</a></li><li class="SubLinkListItem"><a href="/">Feedback and Comments</a></li><li class="SubLinkListItem"><a href="/">Contact Us</a></li></ul></li></ul>';

	$("#Footer").empty();
	$("#Footer").append(html);
  }

  LoadFooter()