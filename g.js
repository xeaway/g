var window = window;

var g =
{
	b : [],

	c:
	{
		set b (o)
		{
			var b = {};
				b.c = o.c || '#000';
				b.h = o.h || 0;
				b.n = o.n || undefined;
				b.t = o.t || undefined;
				b.w = o.h || 0;
				b.x = o.x || 0;
				b.y = o.y || 0;

				b.a = function ()
				{
					if (g.e.type == 'mousedown')
					{
						var ch = g.rel.v (b.h);
						var cw = g.rel.h (b.w);
						var cx = g.rel.h (b.x);
						var cy = g.rel.v (b.y);
						var inx = ((g.e.x >= cx) && (g.e.x <= cx + cw));
						var iny = ((g.e.y >= cy) && (g.e.y <= cy + ch));
						if (inx && iny)
						{
							o.a ();
						};
					};
				};

				g.d = { c: b.c, h: b.h, n: b.n, w: b.w, x: b.x, y: b.y };

				b.update = function ()
				{
					b.a ();
				};

			g.o.push (b);
		}
	},

	cvs:
	{
		create: function ()
		{
			var cvs = window.document.createElement ('canvas');
				cvs.ctx = cvs.getContext ('2d');
				cvs.style.position = 'absolute';

				cvs.clear = function (name)
				{
					var clear = [];
					for (var i = 0; i < g.b.length; i++)
					{
						if (name != g.b[i].n)
						{
							clear.push (g.b[i]);
						};
					};
					g.b = clear;
					g.cvs.redraw = true;
				};

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
			p.i = o.i || undefined; // image.src
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
			g.cvs.ctx.clearRect (0, 0, g.cvs.width, g.cvs.height);
			for (var id in g.b)
			{
				var p = g.b[id];
				var h = g.rel.v (p.h);
				var r = g.rel.r (p.r);
				var s = g.rel.v (p.s);
				var w = g.rel.h (p.w);
				var x = g.rel.h (p.x);
				var y = g.rel.v (p.y);

				switch (p.type)
				{
					case 'box':
						g.cvs.ctx.beginPath ();
						g.cvs.ctx.fillStyle = p.c;
						g.cvs.ctx.lineWidth = p.l;
						g.cvs.ctx.strokeStyle = p.c;
						var t = (p.f) ? g.cvs.ctx.fillRect (x, y, w, h) : g.cvs.ctx.strokeRect (x, y, w, h);
						break;

					case 'image':
							h = (p.h) ? g.rel.v(p.h) : p.i.height;
							w = (p.w) ? g.rel.h (p.w) : p.i.width;
							g.cvs.ctx.drawImage (p.i, x, y, w, h);
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

	i:
	{
		set l (o)
		{
			var i = new Image ();
				i.src = o.i;
			g.i[o.id] = i;
		}
	},

	input: function ()
	{
		for (var id in g.o)
		{
			g.o[id].update ();
		};
	},

	set log (s) { window.console.log (s); },

	o: [],

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
		g.input ();
		g.draw ();
	}
};

g.run ();