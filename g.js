var window = window;

var g =
{
	b : [],

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
						g.cvs.redraw = true;
					};
				};

				cvs.resize (true);

			window.document.body.appendChild (cvs);
			g.cvs = cvs;
		}
	},

	set d (o)
	{
		var p = {};
			p.c = o.c || '#000'; // color
			p.f = o.f || true; // fill
			p.font = o.font || 'Arial'; // font family
			p.h = o.h || undefined; // height
			p.i = g.l.i (o.i) || undefined; // image.src
			p.id = g.b.length;
			p.l = o.l || 1; // lineWidth
			p.n = o.n || undefined; // name
			p.r = o.r || undefined; // radius
			p.s = o.s || '100%'; // font size
			p.t = o.t || undefined; // text
			p.w = o.w || undefined; // width
			p.x = o.x || 0;
			p.y = o.y || 0;
			p.z = o.z || 0; // layer

			p.type = 'box';
			p.type = (p.i) ? 'image' : p.type;
			p.type = (p.r) ? 'round' : p.type;
			p.type = (p.t) ? 'text' : p.type;

		g.b.push (p);
		g.cvs.redraw = true;
	},

	draw: function ()
	{
		g.cvs.resize ();
		if (g.cvs.redraw)
		{
			for (var id in g.b)
			{
				var p = g.b[id];
				var h = g.rel.v(p.h);
				var r = g.rel.r (p.r);
				var s = g.rel.v (p.s);
				var w = g.rel.h (p.w);
				var x = g.rel.h (p.x);
				var y = g.rel.v (p.y);

				switch (p.type)
				{
					case 'box':
						g.cvs.ctx.fillStyle = p.c;
						g.cvs.ctx.lineWidth = p.l;
						g.cvs.ctx.strokeStyle = p.c;
						var t = (p.f) ? g.cvs.ctx.fillRect (x, y, w, h) : g.cvs.ctx.strokeRect (x, y, w, h);
						break;

					case 'image':
						h = (p.h) ? g.rel.v(p.h) : p.i.height;
						w = (p.w) ? g.rel.h (p.w) : p.i.width;
						g.cvs.ctx.drawImage (i, x, y, w, h);
						break;

					case 'round':
						g.cvs.ctx.fillStyle = p.c;
						g.cvs.ctx.lineWidth = p.l;
						g.cvs.ctx.strokeStyle = p.c;
						g.cvs.ctx.arc (x, y, r, 0, 2 * Math.PI);
						break;

					case 'text':
						g.cvs.ctx.fillStyle = p.c;
						g.cvs.ctx.lineWidth = p.l;
						g.cvs.ctx.strokeStyle = p.c;
						g.cvs.ctx.font = s + p.font;
						var t = (p.f) ? g.cvs.ctx.fillText (p.t, x, y) : g.cvs.ctx.strokeText (p.t, x, y);
						break;
				};
			};
			g.cvs.redraw = false;
		};
	},

	e: {},

	l:
	{
		i: function (src)
		{
			if (src)
			{
				var img = new Image ();
					img.src = src;

					img.onload = function ()
					{
						return img;
					};
			} else { return src };
		}
	},

	set log (s) { window.console.log (s); },

	rel:
	{
		h: function (n)
		{
			if ((n > 0) && (n <= 1))
			{
				return Math.floor (g.cvs.width * n);
			}
			else
			{
				return n;
			};
		},

		r: function (n)
		{
			if ((n > 0) && (n <= 1))
			{
				return Math.floor (Math.min (g.cvs.height, g.cvs.width) * n);
			}
			else
			{
				return n;
			};
		},

		v: function (n)
		{
			if ((n > 0) && (n <= 1))
			{
				return Math.floor (g.cvs.height * n);
			}
			else
			{
				return n;
			};
		}
	},

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
		g.draw ();
	}
};

g.run ();