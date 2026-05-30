// Background slideshow (runs on every page that loads this file + jQuery Backstretch)
$(function () {
	$('body').backstretch(
		['images/bkgd1.jpg', 'images/bkgd2.jpg', 'images/bkgd3.jpg'],
		{ duration: 3200, fade: 1300 }
	);
});

$(function () {
	var wrap = document.querySelector(".site-nav-dropdown-wrap");
	var trigger = document.querySelector(".site-nav-dropdown-trigger");
	var menu = document.getElementById("portfolioSubmenu");
	if (!wrap || !trigger || !menu) return;

	function closeMenu() {
	  wrap.classList.remove("is-open");
	  trigger.setAttribute("aria-expanded", "false");
	}

	function openMenu() {
	  wrap.classList.add("is-open");
	  trigger.setAttribute("aria-expanded", "true");
	}

	trigger.addEventListener("click", function (e) {
	  e.preventDefault();
	  e.stopPropagation();
	  if (wrap.classList.contains("is-open")) {
		closeMenu();
	  } else {
		openMenu();
	  }
	});

	document.addEventListener("click", function (e) {
	  if (!wrap.contains(e.target)) {
		closeMenu();
	  }
	});

	document.addEventListener("keydown", function (e) {
	  if (e.key === "Escape") {
		closeMenu();
	  }
	});

	menu.querySelectorAll("a[data-tab]").forEach(function (link) {
	  link.addEventListener("click", function (e) {
		e.preventDefault();
		var tab = link.getAttribute("data-tab");
		document
		  .querySelectorAll(".portfolio-section")
		  .forEach(function (s) {
			s.classList.remove("consumer-apps");
		  });
		var panel = document.getElementById("tab-" + tab);
		if (panel) {
		  panel.classList.add("consumer-apps");
		  closeMenu();
		  panel.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	  });
	});
  });

// On portfolio.html, activate the tab specified by ?tab= in the URL
$(function () {
  if (!document.querySelector('.portfolio-section')) return;
  var params = new URLSearchParams(window.location.search);
  var tab = params.get('tab');
  if (!tab) return;
  document.querySelectorAll('.portfolio-section').forEach(function (s) {
    s.classList.remove('consumer-apps');
  });
  var panel = document.getElementById('tab-' + tab);
  if (panel) panel.classList.add('consumer-apps');
});
