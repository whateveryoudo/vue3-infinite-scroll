import { defineComponent as J, ref as t, useSlots as Q, computed as y, watch as U, nextTick as V, onMounted as Z, onBeforeMount as ee, openBlock as W, createElementBlock as C, normalizeStyle as M, createElementVNode as q, normalizeClass as te, Fragment as le, renderList as ae, renderSlot as $, createCommentVNode as ue } from "vue";
const oe = /* @__PURE__ */ J({
  __name: "infinite-scroll",
  props: {
    height: {
      type: [Number, String],
      default: "100%"
    },
    width: {
      type: [Number, String],
      default: "100%"
    },
    rowKey: {
      type: String,
      default: "id"
    },
    listData: {
      type: Array,
      default: () => []
    },
    scrollOption: {
      type: Object
    }
  },
  emits: ["rowScrollEnd"],
  setup(u, { expose: F, emit: D }) {
    const a = u, I = D, j = {
      dir: "up",
      step: 0.5,
      singleDataCount: 0,
      singleStepDis: 0,
      hoverStop: !0,
      waitTime: 1e3,
      autoPlay: !0,
      loop: !0,
      slideIndex: 0
    }, B = t(""), d = t(0), H = t(!1), s = t(0), i = t(0), O = t(0), P = t(0), K = t(0), R = t(0), x = t(!1), E = t(), h = t(), g = t(), w = t(), v = t(), L = Q(), b = y(() => !!L["custom-render"]), f = y(() => ["right", "left"].includes(o.value.dir)), k = y(() => {
      var n;
      const e = (n = g.value) == null ? void 0 : n.querySelector(".scroll-row-item");
      if (b.value && o.value.singleDataCount > 0 && e) {
        const r = e.nextElementSibling;
        if (r) {
          const c = e.getBoundingClientRect(), p = r.getBoundingClientRect(), l = f.value ? p.left - c.left : p.top - c.top;
          return o.value.singleDataCount * Math.abs(l);
        }
      }
      return o.value.singleStepDis;
    }), m = y(() => {
      let e = o.value.step;
      const n = k.value;
      return n > 0 && n % e > 0 && console.error(
        "\u5982\u679C\u8BBE\u7F6E\u4E86\u5355\u6B65\u6EDA\u52A8,step\u9700\u662F\u5355\u6B65\u5927\u5C0F\u7684\u7EA6\u6570,\u5426\u5219\u65E0\u6CD5\u4FDD\u8BC1\u5355\u6B65\u6EDA\u52A8\u7ED3\u675F\u7684\u4F4D\u7F6E\u662F\u5426\u51C6\u786E\u3002~~~~~"
      ), e;
    }), A = t(a.listData);
    U(
      a.listData,
      (e) => {
        T(), A.value = e, N();
      },
      { flush: "post" }
    );
    const o = y(() => ({ ...j, ...a.scrollOption })), X = y(() => ({
      transform: `translate(${i.value}px,${s.value}px)`,
      transition: "all ease-in 0ms",
      overflow: "hidden"
    })), z = () => {
      const { dir: e, waitTime: n, autoPlay: r } = o.value, c = K.value / 2, p = R.value / 2;
      switch (e) {
        case "up":
          Math.abs(s.value) >= p && (s.value = 0), console.log(m.value), s.value -= m.value;
          break;
        case "down":
          s.value >= 0 && (s.value = p * -1), s.value += m.value;
          break;
        case "left":
          Math.abs(i.value) >= c && (i.value = 0), i.value -= m.value;
          break;
        case "right":
          i.value >= 0 && (i.value = c * -1), i.value += m.value;
          break;
      }
      if (v.value && clearTimeout(v.value), k.value > 0)
        if (Math.abs(f.value ? i.value : s.value) % k.value < m.value) {
          (!B.value || B.value === e) && (["up", "right"].includes(e) ? d.value -= 1 : d.value += 1), B.value = e;
          let l = d.value;
          const _ = a.listData.length * 2;
          if (l <= 0 ? (d.value = _, l = _ - 1) : (l > _ && (d.value = l = 1), l -= 1), I("rowScrollEnd", a.listData[l % a.listData.length]), x.value)
            return;
          v.value = setTimeout(() => {
            x.value || r && S();
          }, n);
        } else
          S();
      else
        S();
    }, S = () => {
      w.value && cancelAnimationFrame(w.value || ""), w.value = requestAnimationFrame(z);
    }, N = async () => {
      if (await V(), !E.value || !h.value || !g.value)
        return;
      const { loop: e, autoPlay: n } = o.value;
      P.value = E.value.offsetHeight, O.value = E.value.offsetWidth;
      const r = g.value.offsetWidth;
      if (f.value ? O.value <= r : P.value <= g.value.offsetHeight) {
        if (b.value && o.value.loop) {
          const p = a.listData.map((l) => l instanceof Object ? {
            ...l,
            [a.rowKey]: l[a.rowKey] ? `copy_${l[a.rowKey]}` : l[a.rowKey]
          } : l);
          A.value = [...a.listData, ...p];
        } else
          H.value = e;
        await V(), f.value && e && (h.value.style.width = r * 2 + "px"), R.value = h.value.offsetHeight, K.value = h.value.offsetWidth, n && S();
      }
    }, T = () => {
      v.value && clearTimeout(v.value), w.value && cancelAnimationFrame(w.value || "");
    }, Y = () => {
      o.value.autoPlay && o.value.hoverStop && (x.value = !0, k.value > 0 ? v.value && (clearTimeout(v.value), v.value = void 0) : T());
    }, G = () => {
      o.value.autoPlay && o.value.hoverStop && (x.value = !1, S());
    };
    return F({ perMove: z }), Z(() => {
      d.value = o.value.slideIndex, N();
    }), ee(() => {
      T();
    }), (e, n) => (W(), C("div", {
      ref_key: "overflowWrap",
      ref: E,
      class: "infinite-scroll-wrapper",
      style: M({ height: typeof u.height == "number" ? `${u.height}px` : u.height, width: typeof u.width == "number" ? `${u.width}px` : u.width })
    }, [
      q("div", {
        class: "scroll-wrapper",
        ref_key: "scrollWrap",
        ref: h,
        style: M(X.value),
        onMouseenter: Y,
        onMouseleave: G
      }, [
        q("div", {
          ref_key: "originWrap",
          ref: g,
          class: te(["origin-wrapper", f.value && "horizontal"]),
          style: M(f.value ? { float: "left" } : {})
        }, [
          b.value ? (W(!0), C(le, { key: 0 }, ae(A.value, (r, c) => (W(), C("div", {
            key: r[u.rowKey] || c,
            class: "scroll-row-item"
          }, [
            $(e.$slots, "custom-render", {
              item: r
            }, void 0, !0)
          ]))), 128)) : $(e.$slots, "default", { key: 1 }, void 0, !0)
        ], 6),
        !b.value && H.value ? (W(), C("div", {
          key: 0,
          class: "copy-wrapper",
          style: M(f.value ? { float: "left" } : {})
        }, [
          $(e.$slots, "default", {}, void 0, !0)
        ], 4)) : ue("", !0)
      ], 36)
    ], 4));
  }
});
const ne = (u, F) => {
  const D = u.__vccOpts || u;
  for (const [a, I] of F)
    D[a] = I;
  return D;
}, re = /* @__PURE__ */ ne(oe, [["__scopeId", "data-v-d1fc2643"]]), se = (u) => {
  u.component("Vue3InfiniteScroll", re);
}, ve = {
  install: se
};
export {
  re as Vue3InfiniteScroll,
  ve as default
};
