
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        const getDiv = document.querySelector('.test') as HTMLElement
        const particle = getDiv.children[0] as HTMLElement
        particle.style.height = 100 + '%'
    }
    id = "tsparticles";
    particlesOptions = {
        background: {
            color: {
                value: "#000"
            }

        },
        fpsLimit: 70,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 100,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 1
                },
                repulse: {
                    distance: 35,
                }
            }
        },
        particles: {
            color: {
                value: "#ffffff"
            },
            links: {
                color: "#ffffff",
                distance: 120,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 1000
                },
                value: 750
            },
            opacity: {
                value: 1
            },
            shape: {
                type: "circle"
            },
            size: {
                random: true,
                value: 2
            }
        },
        detectRetina: true
    };

    particlesLoaded(container): void {
    }

    particlesInit(main): void {
    }
}
