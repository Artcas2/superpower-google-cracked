
				{
					__sveltekit_1bn5v1x = {
						base: new URL(".", location).pathname.slice(0, -1),
						env: {}
					};

					const element = document.currentScript.parentElement;

					const data = [null,null];

					Promise.all([
						import("./app/immutable/entry/start.15b6087f.js"),
						import("./app/immutable/entry/app.30111322.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 3],
							data,
							form: null,
							error: null
						});
					});
				}
			