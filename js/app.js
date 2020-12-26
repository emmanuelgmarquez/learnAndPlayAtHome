// Page Transition Animations //

const initialPageAnimation = () => {
    let timeline = gsap.timeline()

    timeline.fromTo('.logo', {
        x: -200,
        opacity: 0,

    }, {
        x: 0,
        opacity: 1,
        delay: .5,
        duration: 1.3
    })
    timeline.fromTo('.menu', {
            x: 200,
            opacity: 0,

        }, {
            x: 0,
            opacity: 1,
            delay: .5,
            duration: 1.3
        },
        ">-1.8"
    )
    timeline.fromTo('.info-section h1', {
            x: 0,
            y: 100,
            opacity: 0
        }, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.3
        })
        .addLabel("h1Show")
    timeline.fromTo('.girl', {
            height: 0,
            opacity: .1
        }, {
            opacity: 1,
            height: 600,
            duration: 1.4,
            ease: "power2.inOut"
        },
        ">-.5"
    )
    timeline.fromTo('.boy', {
            height: 0,
            opacity: .1
        }, {
            opacity: 1,
            height: 600,
            duration: 1.4,
            ease: "power2.inOut"
        },
        ">-1"
    )
    timeline.fromTo('.shape1', {
            scale: 0,
            opacity: 0
        }, {
            scale: 1,
            opacity: 1,
            ease: "power2.inOut"
        },
        ">-1"
    )
    timeline.fromTo('.shape3', {
            opacity: 0
        }, {
            opacity: .6,
            ease: "power2.inOut",
            duration: 1
        },
        ">-.2"
    )
    timeline.fromTo('.shape3', {
        y: 325
    }, {
        y: 290,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true
    })
    timeline.fromTo('.shape2', {
            opacity: 0
        }, {
            opacity: .3,
            ease: "power2.inOut",
            duration: 1
        },
        ">-2"
    )
    timeline.fromTo('.shape2', {
        y: -300
    }, {
        y: -335,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true
    })
    timeline.fromTo('.info-section h4', {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1.3
        },
        "h1Show"
    )
    timeline.fromTo('.call-actions', {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1.3
        },
        "h1Show+=1"
    );
}


const delay = (n) => {
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n)
    })
}
const loadingLeave = () => {
    let timeline = gsap.timeline();
    timeline.fromTo('.loading-bg', {
        y: "100%"
    }, {
        y: 0,
    })
}
const loadingEnter = () => {
    let timeline = gsap.timeline();
    timeline.fromTo('.loading-bg', {
        y: 0
    }, {
        y: "100%",
        duration: 2
    })
}
const galleryEnter = () => {
    let timeline = gsap.timeline();
    timeline.fromTo('.white-bg', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: .8,
        ease: 'power1.inOut'
    }).fromTo(
        '.white-bg ul li', {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: .4,
            stagger: .2,
            ease: 'power1.inOut'
        }
    )
}

barba.init({
    sync: true,
    transitions: [{
        name: 'page-wipe',
        async leave(data) {
            const done = this.async();
            console.log('Leaving Page Animation');
            loadingLeave();
            await delay(1500);
            done();
        },
        async enter(data) {
            loadingEnter();
            initialPageAnimation();
            console.log('Entering Page Animation');
        },
        async once(data) {
            initialPageAnimation();
        }
    },
    {
        name: 'gallery-transition',
        from: {
            namespace: ['home', 'about']
        },
        to: {
            namespace: ['gallery']
        },
        async leave(data) {
            const done = this.async();
            console.log('Leaving Page Animation');
            loadingLeave();
            await delay(1500);
            done();
        },
        async enter(data) {
            loadingEnter();
            galleryEnter();
            console.log('Entering Page Animation');
        },
        async once(data) {
            initialPageAnimation();
        }
    }],
    views: [
    //     {
    //     namespace: 'index',
    //     beforeLeave(data) {
    //       // do something before leaving the current `index` namespace
    //     }
    //   }, 
    {
        namespace: 'about',
        afterEnter(data) {
            loadingEnter();
        }
      },
    
      {
        namespace: 'gallery',
        afterEnter(data) {
            loadingEnter();
            galleryEnter();
        }
      }
    ]
});

// Scroll Animation //

const tlServicesScroll = new gsap.timeline({
    onUpdate : debugPercentage
})

function debugPercentage() {
    console.log(tlServicesScroll.progress())
}

tlServicesScroll.fromTo('#about-me', {
    x: '200%'
}, {
    x: 0
})

const serviceElement = document.querySelector('#about-me');

let homeController = new ScrollMagic.Controller();

let serviceScene = new ScrollMagic.Scene({
    triggerElement: '#about-me',
    triggerHook: 1,
    duration: serviceElement.offsetHeight
})

.setTween(tlServicesScroll)
.addTo(homeController)

