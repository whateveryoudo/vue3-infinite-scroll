import { defineComponent as G, ref as t, useSlots as J, computed as f, watch as Q, nextTick as j, onMounted as U, onBeforeMount as Z, openBlock as E, createElementBlock as b, createElementVNode as N, normalizeStyle as H, unref as p, normalizeClass as ee, Fragment as te, renderList as le, renderSlot as O, createCommentVNode as ae } from "vue";
const oe = /* @__PURE__ */ G({
  __name: "infinite-scroll",
  props: {
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
  setup(n, { expose: F, emit: S }) {
    const l = n, M = {
      dir: "up",
      step: 0.5,
      singleDataCount: 0,
      singleStepDis: 0,
      hoverStop: !0,
      waitTime: 1e3,
      autoPlay: !0,
      loop: !0,
      slideIndex: 0
    }, C = t(""), v = t(0), P = t(!1), r = t(0), s = t(0), T = t(0), K = t(0), $ = t(0), z = t(0), _ = t(), d = t(), m = t(), y = t(), w = t(), L = J(), W = f(() => !!L["custom-render"]), i = f(() => ["right", "left"].includes(a.value.dir)), I = f(() => {
      var u;
      const e = (u = m.value) == null ? void 0 : u.querySelector(".scroll-row-item");
      return W.value && a.value.singleDataCount > 0 ? a.value.singleDataCount * (e ? i.value ? e.offsetWidth : e.offsetHeight : 0) : a.value.singleStepDis;
    }), h = f(() => {
      let e = a.value.step;
      const u = I.value;
      return u > 0 && u % e > 0 && console.error(
        "\u5982\u679C\u8BBE\u7F6E\u4E86\u5355\u6B65\u6EDA\u52A8,step\u9700\u662F\u5355\u6B65\u5927\u5C0F\u7684\u7EA6\u6570,\u5426\u5219\u65E0\u6CD5\u4FDD\u8BC1\u5355\u6B65\u6EDA\u52A8\u7ED3\u675F\u7684\u4F4D\u7F6E\u662F\u5426\u51C6\u786E\u3002~~~~~"
      ), e;
    }), x = t(l.listData);
    Q(
      l.listData,
      (e) => {
        A(), x.value = e, q();
      },
      { flush: "post" }
    );
    const a = f(() => ({ ...M, ...l.scrollOption })), R = f(() => ({
      transform: `translate(${s.value}px,${r.value}px)`,
      transition: "all ease-in 0ms",
      overflow: "hidden"
    })), V = () => {
      const { dir: e, waitTime: u, autoPlay: c } = a.value, D = $.value / 2, k = z.value / 2;
      switch (e) {
        case "up":
          Math.abs(r.value) >= k && (r.value = 0), r.value -= h.value;
          break;
        case "down":
          r.value >= 0 && (r.value = k * -1), r.value += h.value;
          break;
        case "left":
          Math.abs(s.value) >= D && (s.value = 0), s.value -= h.value;
          break;
        case "right":
          s.value >= 0 && (s.value = D * -1), s.value += h.value;
          break;
      }
      if (w.value && clearTimeout(w.value), I.value > 0)
        if (Math.abs(i.value ? s.value : r.value) % I.value < h.value) {
          (!C.value || C.value === e) && (["up", "right"].includes(e) ? v.value -= 1 : v.value += 1), C.value = e;
          let o = v.value;
          const B = l.listData.length * 2;
          o <= 0 ? (v.value = B, o = B - 1) : (o > B && (v.value = o = 1), o -= 1), S("rowScrollEnd", l.listData[o % l.listData.length]), w.value = setTimeout(() => {
            c && g();
          }, u);
        } else
          g();
      else
        g();
    }, g = () => {
      y.value && cancelAnimationFrame(y.value || ""), y.value = requestAnimationFrame(V);
    }, q = async () => {
      if (await j(), !_.value || !d.value || !m.value)
        return;
      const { loop: e, autoPlay: u } = a.value;
      K.value = _.value.offsetHeight, T.value = _.value.offsetWidth;
      const c = m.value.offsetWidth;
      if (i.value ? T.value <= c : K.value <= m.value.offsetHeight) {
        if (W.value && a.value.loop) {
          const k = l.listData.map((o) => o instanceof Object ? {
            ...o,
            [l.rowKey]: o[l.rowKey] ? `copy_${o[l.rowKey]}` : o[l.rowKey]
          } : o);
          x.value = [...l.listData, ...k];
        } else
          P.value = e;
        await j(), i.value && e && (d.value.style.width = c * 2 + "px"), z.value = d.value.offsetHeight, $.value = d.value.offsetWidth, u && g();
      }
    }, A = () => {
      w.value && clearTimeout(w.value), y.value && cancelAnimationFrame(y.value || "");
    }, X = () => {
      a.value.autoPlay && a.value.hoverStop && A();
    }, Y = () => {
      a.value.autoPlay && a.value.hoverStop && g();
    };
    return F({ perMove: V }), U(() => {
      v.value = a.value.slideIndex, q();
    }), Z(() => {
      A();
    }), (e, u) => (E(), b("div", {
      ref_key: "overflowWrap",
      ref: _,
      class: "infinite-scroll-wrapper"
    }, [
      N("div", {
        class: "scroll-wrapper",
        ref_key: "scrollWrap",
        ref: d,
        style: H(p(R)),
        onMouseenter: X,
        onMouseleave: Y
      }, [
        N("div", {
          ref_key: "originWrap",
          ref: m,
          class: ee(["origin-wrapper", p(i) && "horizontal"]),
          style: H(p(i) ? { float: "left" } : {})
        }, [
          p(W) ? (E(!0), b(te, { key: 0 }, le(x.value, (c, D) => (E(), b("div", {
            key: c[n.rowKey] || D,
            class: "scroll-row-item"
          }, [
            O(e.$slots, "custom-render", { item: c }, void 0, !0)
          ]))), 128)) : O(e.$slots, "default", { key: 1 }, void 0, !0)
        ], 6),
        !p(W) && P.value ? (E(), b("div", {
          key: 0,
          class: "copy-wrapper",
          style: H(p(i) ? { float: "left" } : {})
        }, [
          O(e.$slots, "default", {}, void 0, !0)
        ], 4)) : ae("", !0)
      ], 36)
    ], 512));
  }
});
const ue = (n, F) => {
  const S = n.__vccOpts || n;
  for (const [l, M] of F)
    S[l] = M;
  return S;
}, re = /* @__PURE__ */ ue(oe, [["__scopeId", "data-v-fd82bc3b"]]), se = (n) => {
  n.component("Vue3InfiniteScroll", re);
}, ie = {
  install: se
};
export {
  re as Vue3InfiniteScroll,
  ie as default
};
