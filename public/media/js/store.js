/* ==========================================================================
   zada4ko.com — local progress (no accounts, nothing leaves the browser)
   ========================================================================== */
"use strict";

(function (Z) {
  var KEY = "z4_progress_v1";

  var BADGES = [
    { id: "first",    icon: "🌱", test: function (s) { return s.solved >= 1; } },
    { id: "ten",      icon: "⭐", test: function (s) { return s.correct >= 10; } },
    { id: "fifty",    icon: "🌟", test: function (s) { return s.correct >= 50; } },
    { id: "hundred",  icon: "🏆", test: function (s) { return s.correct >= 100; } },
    { id: "fivehund", icon: "👑", test: function (s) { return s.correct >= 500; } },
    { id: "streak5",  icon: "🔥", test: function (s) { return s.bestStreak >= 5; } },
    { id: "streak15", icon: "🚀", test: function (s) { return s.bestStreak >= 15; } },
    { id: "perfect",  icon: "💯", test: function (s) { return s.perfects >= 1; } },
    { id: "perfect5", icon: "🎖️", test: function (s) { return s.perfects >= 5; } },
    { id: "explorer", icon: "🧭", test: function (s) { return Object.keys(s.topics).length >= 5; } },
    { id: "master",   icon: "🎓", test: function (s) { return Object.keys(s.topics).length >= 12; } },
    { id: "printer",  icon: "🖨️", test: function (s) { return s.printed >= 1; } }
  ];

  function blank() {
    return { solved: 0, correct: 0, sheets: 0, printed: 0, perfects: 0, bestStreak: 0, topics: {}, badges: [] };
  }

  var Store = {
    badges: BADGES,
    data: blank(),

    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) {
          var d = JSON.parse(raw);
          Object.keys(blank()).forEach(function (k) { if (d[k] === undefined) d[k] = blank()[k]; });
          Store.data = d;
        }
      } catch (e) { Store.data = blank(); }
      return Store.data;
    },

    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(Store.data)); } catch (e) { /* private mode */ }
    },

    /** Record one answered task; returns newly unlocked badges. */
    answer: function (topicId, ok, streak) {
      var d = Store.data;
      d.solved++;
      if (ok) d.correct++;
      if (streak > d.bestStreak) d.bestStreak = streak;
      if (!d.topics[topicId]) d.topics[topicId] = { n: 0, ok: 0 };
      d.topics[topicId].n++;
      if (ok) d.topics[topicId].ok++;
      return Store.refreshBadges();
    },

    finishSheet: function (allCorrect) {
      Store.data.sheets++;
      if (allCorrect) Store.data.perfects++;
      return Store.refreshBadges();
    },

    countPrint: function () {
      Store.data.printed++;
      Store.refreshBadges();
    },

    refreshBadges: function () {
      var d = Store.data, fresh = [];
      BADGES.forEach(function (b) {
        if (d.badges.indexOf(b.id) === -1 && b.test(d)) { d.badges.push(b.id); fresh.push(b); }
      });
      Store.save();
      return fresh;
    },

    accuracy: function () {
      var d = Store.data;
      return d.solved ? Math.round((d.correct / d.solved) * 100) : 0;
    },

    reset: function () { Store.data = blank(); Store.save(); }
  };

  Z.Store = Store;
})(window.Z);
