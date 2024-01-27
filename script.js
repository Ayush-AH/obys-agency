function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()


function loader() {
  function timer() {
    var time = document.querySelector("#timer h3")
    var grow = 0

    var timer = setInterval(() => {
      if (grow < 100) {
        grow++
        time.innerHTML = grow
      }
      else {
        time.innerHTML = "100"
        clearInterval(timer)
      }
    }, 35);
  }
  timer()
  var tl = gsap.timeline()
  tl
    .from(".load h1,#now", {
      y: "100%",
      stagger: 0.2,
    })
    .to(".load", {
      opacity: 0,
      stagger: -0.2,
      delay: 3
    })
    .to("#loader", {
      top: "-120%",
      ease: "power3.out",
      duration: 1
    })
    .from("#text .elem h1",{
      y:"100%",
      stagger:{
        amount:0.5
      }
    },"-=1")
}
loader()

function pageOne() {
  var card = document.querySelector("#card h1")

  document.addEventListener("mousemove",function(dets){
    gsap.to("#yellow",{
      x:dets.x,
      y:dets.y
    })
  })
  card.addEventListener("mousemove", function () {
    gsap.to("#yellow", {
      opacity: 1
    })
  })

  card.addEventListener("mouseleave", function () {
    gsap.to("#yellow", {
      opacity: 0,
    })
  })

  gsap.to("#navbar h4",{
    y:"-50%",
    opacity:0,
    scrollTrigger:{
      trigger:"#page1",
      scroller:"#main",
      start:"top top",
      end:"top -10%",
      scrub:1
    }
  })
}
pageOne()

function video() {
  var videoCon = document.querySelector("#video-container")
  var video = document.querySelector("#video-container video")
  var cur2 = document.querySelector("#cursor2")
  video.pause()
  var click = true
  videoCon.addEventListener("click", function () {
    if (click == true) {
      gsap.to("#video-container video", {
        opacity: 1
      })
      gsap.to("#cursor2", {
        scale: .6
      })
      
      cur2.innerHTML = `<i class="ri-pause-mini-fill"></i>`
      video.play()
      video.muted = false
      click = false
    }
    else {
      gsap.to("#video-container video", {
        opacity: 0
      })
      gsap.to("#cursor2", {
        scale: 1
      })
     
      cur2.innerHTML = `<i class="ri-play-mini-fill"></i>`
      video.pause()
      video.muted = true
      click = true
    }
  })
  videoCon.addEventListener("mousemove", function (dets) {
    var valX = dets.x - videoCon.getBoundingClientRect().left
    var valY = dets.y - videoCon.getBoundingClientRect().top
    gsap.to("#cursor2", {
      left: valX,
      top: valY
    })
    gsap.to(".mousefollower",{
      opacity:0
    })
  })

  videoCon.addEventListener("mouseleave", function (dets) {
    var valX = dets.x - videoCon.getBoundingClientRect().left
    var valY = dets.y - videoCon.getBoundingClientRect().top
    gsap.to("#cursor2", {
      left: "70%",
      top: "0",
    })
    gsap.to(".mousefollower",{
      opacity:1
    })
  })
}
video()
if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent )) {
  function sheryAnimation(){
    Shery.imageEffect(".effect", {
      style: 5,
      gooey: true,
      config:{"a":{"value":1.83,"range":[0,30]},"b":{"value":-0.91,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8792966510177752},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.31,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.38,"range":[0,2],"_gsap":{"id":79}},"discard_threshold":{"value":0.61,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.53,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
    });
    Shery.mouseFollower()
    Shery.makeMagnet(".magnet-target" , {
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
    }
    sheryAnimation()
}

function page3anime(){
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "top 80%",
    end: "top 70%",
    scrub: 3,
  }
})
tl
  .from("#top-1 h3", {
    opacity: 0,
    duration: 1
  }, 'a')
  .from("#pro h1", {
    y: 100,
    duration: 1

  }, 'a')
  .from("#line2", {
    width: "0%"
  })
}
page3anime()
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    start: "top 80%",
    end: "top 30%",
    scrub: 3,
  }
})
  .from("#lt h4", {
    opacity: 0,
    duration: 1
  }, 'a')
  .from("#abo h1", {
    y: 100,
    duration: 1
  }, 'a')
  .from("#line3", {
    width: "0%"
  })
  .from(".h h3", {
    y: 100,
    stagger: 0.1
  })

gsap.from("#line32", {
  width: 0,
  scrollTrigger: {
    trigger: "#work",
    scroller: "#main",
    start: "top 80%",
    end: "top 40%",
    scrub: 3,
  }
})



var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#page7",
    scroller: "#main",
    start: "top 80%",
    end: "top 70%",
    scrub: 3,
  }
})
tl
  .from("#pt1 h4", {
    opacity: 0,
    duration: 1
  }, 'a')
  .from("#create h1", {
    y: 100,
    duration: 1

  }, 'a')
  .from("#li1,#li2", {
    width: "0%",
    stagger: 0.2
  })

document.querySelectorAll("#create h1").forEach(function (h) {
  var clutter = ""
  h.textContent.split("").forEach(function (letter) {
    clutter += `<span>${letter}</span>`
  })
  h.innerHTML = clutter

})
var tl7 = gsap.timeline({paused:true})
tl7
.to("#plain span",{
  opacity:0,
  stagger:0.1
},"a")
.to("#silk span",{
  opacity:1,
  stagger:0.1,
  delay:0.05
},"a")
document.querySelector("#create").addEventListener("mousemove", function () {
 tl7.play()
})
document.querySelector("#create").addEventListener("mouseleave", function () {
  tl7.reverse()
})



function menu(){
  var menu = document.querySelector("#menu")
  var flag = 1
  
  menu.addEventListener("click",function(){
    if (flag == 1) {
      gsap.fromTo("#navigation",{
        clipPath: `polygon(0 0, 100% 0, 100% 0, 0 0)`
      },{
        clipPath: `polygon(0 0%, 100% 0, 100% 100%, 0% 100%)`
      })
      gsap.fromTo("#navigation h1",{
        y:"100%",
        opacity:0
      },{
        y:"0%",
        opacity:1,
        stagger:{
          amount:0.5
        }
      })
      gsap.to("#navbar h4",{
        opacity:0
      })
      flag = 0
    }
    else{
      gsap.fromTo("#navigation",{
        clipPath: `polygon(0 0%, 100% 0, 100% 100%, 0% 100%)`
      },{
        clipPath: `polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`,
        delay:0.5
      })
      gsap.fromTo("#navigation h1",{
        y:"0%",
        opacity:1
      },{
        y:"-20%",
        opacity:0,
      })
      gsap.to("#navbar h4",{
        opacity:1
      })
      flag = 1
    }
    
  })
}
menu()


