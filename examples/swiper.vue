<template>
  <!-- Carousel slider  数据格式-->
  <div id="apps">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <!-- elements with  "swiper-carousel-animate-opacity" class will have animated opacity -->
          <div class="swiper-carousel-animate-opacity">
            <!-- https://carousel-slider.uiinitiative.com/ -->
            <img src="https://carousel-slider.uiinitiative.com/images/guardians-of-the-galaxy.jpg" alt="" />
            <div class="slide-content">
              <h2>Guardians Of The Galaxy1</h2>
              <p>A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/justice-league.jpg" alt="" />
            <div class="slide-content">
              <h2>Justice League2</h2>
              <p>Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/spider-man.jpg" alt="" />
            <div class="slide-content">
              <h2>Spider-Man: Far from Home3</h2>
              <p>Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/suicide-squad.jpg" alt="" />
            <div class="slide-content">
              <h2>The Suicide Squad4</h2>
              <p>Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/thor-ragnarok.jpg" alt="" />
            <div class="slide-content">
              <h2>Thor: Ragnarok5</h2>
              <p>Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/dr-strange.jpg" alt="" />
            <div class="slide-content">
              <h2>Doctor Strange</h2>
              <p>America Chavez and a version of Stephen Strange are chased by a demon in the space between universes while searching for the Book of Vishanti</p>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-carousel-animate-opacity">
            <img src="https://carousel-slider.uiinitiative.com/images/eternals.jpg" alt="" />
            <div class="slide-content">
              <h2>Eternals</h2>
              <p>In 5000 BC, ten superpowered Eternals—Ajak, Sersi, Ikaris, Kingo, Sprite, Phastos, Makkari, Druig, Gilgamesh, and Thena—are sent by the Celestial Arishem to Earth on their starship, the Domo, to exterminate the invasive Deviants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import {S as e, A as s, N as r, P as t} from "./assets/vendor.js";
export default {
  data() {
    return {
      activeIndex: 0,
      startPos: null,
      dist: 0,
      list: [
        { title: "Card 1", src: "https://t10.baidu.com/it/app=106&f=JPEG&fm=30&fmt=auto&u=445022150%2C221012473?w=312&h=208&s=2EC3AA4E4D5A2CDE9C51559F03009092" },
        { title: "Card 2", src: "https://t10.baidu.com/it/app=106&f=JPEG&fm=30&fmt=auto&u=445022150%2C221012473?w=312&h=208&s=2EC3AA4E4D5A2CDE9C51559F03009092" },
        { title: "Card 3", src: "https://t10.baidu.com/it/app=106&f=JPEG&fm=30&fmt=auto&u=445022150%2C221012473?w=312&h=208&s=2EC3AA4E4D5A2CDE9C51559F03009092" },
        { title: "Card 4", src: "https://t10.baidu.com/it/app=106&f=JPEG&fm=30&fmt=auto&u=445022150%2C221012473?w=312&h=208&s=2EC3AA4E4D5A2CDE9C51559F03009092" },
        { title: "Card 5", src: "https://t10.baidu.com/it/app=106&f=JPEG&fm=30&fmt=auto&u=445022150%2C221012473?w=312&h=208&s=2EC3AA4E4D5A2CDE9C51559F03009092" },
      ],
    };
  },
  methods: {
    onDragStart(event) {
      this.startPos = event.clientX || event.touches[0].clientX;
    },
    onDragMove(event) {
      if (!this.startPos) return;
      const currentPos = event.clientX || event.touches[0].clientX;
      this.dist = currentPos - this.startPos;
      const delta = this.dist / window.innerWidth;
      this.list.forEach((card, index) => {
        const distance = index - this.activeIndex + delta;
        const absDistance = Math.abs(distance);
        if (absDistance > 1) {
          card.hidden = true;
        } else {
          card.hidden = false;
          const scale = absDistance < 0.5 ? 1.2 - absDistance * 1.2 : 1;
          const zIndex = absDistance < 0.5 ? 1 : 0;
          const x = Math.min(Math.max(distance, -1), 1) * 100;
          card.style.transform = `translateX(${x.toFixed(2)}%) scale(${scale.toFixed(2)})`;
          card.style.zIndex = zIndex;
          card.classList.remove("active", "prev", "next");
          if (distance < 0) {
            card.classList.add("prev");
          } else if (distance > 0) {
            card.classList.add("next");
          } else {
            card.classList.add("active");
          }
        }
      });
    },
    onDragEnd() {
      if (Math.abs(this.dist / window.innerWidth) > 0.2) {
        this.activeIndex += this.dist > 0 ? -1 : 1;
      }
      this.startPos = null;
      this.dist = 0;
    },
  },
  mounted() {
    const mySwiper = new Swiper(".swiper", {
      modules: [
        s,
        r,
        t,
        function({ swiper: e, on: s }) {
          s("beforeInit", () => {
            if ("carousel" !== e.params.effect) return;
            e.classNames.push(`${e.params.containerModifierClass}carousel`);
            const s = {
              watchSlidesProgress: !0,
              centeredSlides: !0,
            };
            Object.assign(e.params, s), Object.assign(e.originalParams, s);
          }),
            s("progress", () => {
              if ("carousel" !== e.params.effect) return;
              const s = e.slides.length;
              for (let r = 0; r < e.slides.length; r += 1) {
                const t = e.slides[r],
                  o = e.slides[r].progress,
                  i = Math.abs(o);
                let a = 1;
                i > 1 && (a = 0.3 * (i - 1) + 1);
                const n = t.querySelectorAll(".swiper-carousel-animate-opacity"),
                  l = o * a * 50 * (e.rtlTranslate ? -1 : 1) + "%",
                  c = 1 - 0.2 * i,
                  u = s - Math.abs(Math.round(o));
                (t.style.transform = `translateX(${l}) scale(${c})`),
                  (t.style.zIndex = u),
                  (t.style.opacity = i > 3 ? 0 : 1),
                  n.forEach((e) => {
                    e.style.opacity = 1 - i / 3;
                  });
              }
            }),
            s("setTransition", (s, r) => {
              if ("carousel" === e.params.effect)
                for (let t = 0; t < e.slides.length; t += 1) {
                  const s = e.slides[t],
                    o = s.querySelectorAll(".swiper-carousel-animate-opacity");
                  (s.style.transitionDuration = `${r}ms`),
                    o.forEach((e) => {
                      e.style.transitionDuration = `${r}ms`;
                    });
                }
            }),
            s("activeIndexChange", (s, r) => {
              console.log(s.realIndex, r);
            });
        },
      ],
      on: {},
      effect: "carousel",
      grabCursor: !0,
      loop: true,
      // loopAddBlankSlides:true,
      //   activeIndex: 3,
      loopAdditionalSlides: 1,
      slidesPerView: "auto",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
          el: ".swiper-pagination"
      },
      autoplay: {
          delay: 3e3
      }
    });
  },
};
</script>

<style scoped>
@import url("./assets/index.css");
</style>
