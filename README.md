# Hinto Widget

```html
<script
(function(window, document) {
	var loader = function() {
		var callback = function() {
			window.Hinto.init(window.hintoSettings)
		}
		var script = document.createElement('script')
		var tag = document.getElementsByTagName('script')[0]
		script.src = 'http://localhost:8080/index.js'
		script.onload = callback
		tag.parentNode.insertBefore(script, tag)
	}

	window.addEventListener
		? window.addEventListener('load', loader, false)
		: window.attachEvent('onload', loader)
	})(window, document);
</script>
```

## Utveckling 🛠

```sh
$ npm install && npm run start
```

### Uppdatera paket 📦

Använd [np](https://github.com/sindresorhus/np) för att uppdatera versioner. np
sköter uppdatering av version, skapar taggar och publicerar till npm.

```sh
$ npm i -g np
$ np
```
