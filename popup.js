let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
	//alert("done");
  //document.getElementById("divKalturaPlayer").sendNotification('playbackRateChangeSpeed', 2);
	//alert("done2");
	var script = document.createElement("script");
	var m = document.createElement("meta");
	m.createAttribute('http-equiv', 'Content-Security-Policy');
//	= "http-equiv=\"Content-Security-Policy\" script-src=\'unsafe-inline\';";
	m.createAttribute("script-src", 'unsafe-inline');
function injection(){
	alert("done");
  document.getElementById("divKalturaPlayer").sendNotification('playbackRateChangeSpeed', 2);
	alert("done2");
};
//Get the function you want to inject as a string and add it to the script.
script.innerHTML = injection.toString();

//Add a call to that injection function so it'll automatically execute once it's injected.
script.innerHTML += "injection();";

//Inject that newly created script into the body of the page.
document.body.appendChild(m);
document.body.appendChild(script);

};

