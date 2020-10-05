function LoadFooter() {
	var html = '';
	html=html+'<ul class="footerList">';
	html=html+'	<li class="footerListItem">';
	html=html+'		<a href="/about">';
	html=html+'			<h4>About Us</h4>';
	html=html+'		</a>';
	html=html+'	</li>';
	html=html+'	<li class="footerListItem">';
	html=html+'		<a href="/">';
	html=html+'			<h4>Partners</h4>';
	html=html+'		</a>';
	html=html+'		<ul class="footerSubLinkList">';
	html=html+'			<li class="SubLinkListItem">';
	html=html+'				<a href="/dealershipList">Dealerships</a>';
	html=html+'			</li>';
	html=html+'		</ul>';
	html=html+'	</li>';
	html=html+'	<li class="footerListItem">';
	html=html+'		<a href="/">';
	html=html+'			<h4>Customer Support</h4>';
	html=html+'		</a>';
	html=html+'		<ul class="footerSubLinkList">';
	html=html+'			<li class="SubLinkListItem">';
	html=html+'				<a href="/">FAQ</a>';
	html=html+'			</li>';
	html=html+'			<li class="SubLinkListItem">';
	html=html+'				<a href="/">Feedback and Comments</a>';
	html=html+'			</li>';
	html=html+'			<li class="SubLinkListItem">';
	html=html+'				<a href="/contactUs">Contact Us</a>';
	html=html+'			</li>';
	html=html+'		</ul>';
	html=html+'	</li>';
	html=html+'</ul>';

	$("#Footer").empty();
	$("#Footer").append(html);
  }

  LoadFooter()