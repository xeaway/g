var window = window;

var g =
{
	c:
	{

	},

	cvs:
	{
		create: function ()
		{
			var cvs = window.document.createElement ('canvas');
				cvs.ctx = cvs.getContext ('2d');
				cvs.style.position = 'absolute';

				cvs.resize = function (run)
				{
					if ((g.e.type == 'resize') || (run))
					{
						cvs.height = window.innerHeight;
						cvs.width = window.innerWidth;
					};
				};

				cvs.resize (true);

			window.document.body.appendChild (cvs);
			g.cvs = cvs;
		}
	},

	e: {},

	set log (s) { window.console.log (s); },

	run: function ()
	{
		g.cvs.create ();
		g.u (g.e = { type: 'run' });

		window.onload = function () { g.u (g.e = event); };
		window.onmousedown = function () { g.u (g.e = event); };
		window.onmousemove = function () { g.u (g.e = event); };
		window.onresize = function () { g.u (g.e = event); };
		window.setInterval (function () { g.u (g.e = { type: 'tick' }); }, g.set.tick );
	},

	set:
	{
		tick: 1000
	},

	u: function ()
	{

	}
};

g.run ();