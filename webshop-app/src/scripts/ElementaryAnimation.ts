// ElementaryAnimation.ts

import { theme } from "../components/MainContainerData";

class ElementaryAnimation {
  element: HTMLElement;
  intersectionObserver: IntersectionObserver[];
  integer: number;

  constructor(element: HTMLElement) {
    this.element = element;
    this.intersectionObserver = [];
    this.integer = 0;

    const contentToAnimate = document.querySelectorAll("[data-animation]") as NodeListOf<HTMLElement>;
    contentToAnimate.forEach((item, i) => {
      this.animateElement(item, i);
      this.integer += 1;
    });

    // Listen for changes to the DOM and animate any new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const newContentToAnimate = (node as HTMLElement).querySelectorAll("[data-animation]") as NodeListOf<HTMLElement>;

            newContentToAnimate.forEach((item, i) => {
              this.animateElement(item, this.integer);
              this.integer += 1;
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  elementScaleOut(elements: HTMLElement[]) {
    const animationDuration = theme.animationDuration;
    const animationDelay = theme.animationBetweenElements;

    elements.forEach((element, index) => {
      if (element.hasAttribute("data-loaded")) {
        return;
      }

      element.setAttribute("data-loaded", "true");

      const keyframes = [
        { transform: "scale(104%)", opacity: "0" },
        { transform: "scale(100%)", opacity: "1" },
      ];

      const animationOptions: KeyframeAnimationOptions = {
        duration: animationDuration,
        fill: "forwards",
      };

      setTimeout(() => {
        element.animate(keyframes, animationOptions);
      }, animationDelay * index);
    });
  }

  elementScaleIn(toReveal: HTMLElement[]) {
    toReveal.forEach((item, i) => {
      if (item.getAttribute("data-loaded")) {
        return;
      }
      setTimeout(() => {
        const elementMove = [
          { transform: "scale(96%)", opacity: "0" },
          { transform: "scale(100%)", opacity: "1" },
        ];
        item.animate(elementMove, {
          duration: theme.animationDuration,
          fill: "forwards",
        });
      }, theme.animationBetweenElements * i);
      item.setAttribute("data-loaded", "true");
    });
  }

  elementFromTop(toReveal: HTMLElement[]) {
    toReveal.forEach((item, i) => {
      if (item.getAttribute("data-loaded")) {
        return;
      }
      setTimeout(() => {
        const elementMove = [
          { transform: "translateY(-30px)", opacity: "0" },
          { transform: "translateY(0px)", opacity: "1" },
        ];
        item.animate(elementMove, {
          duration: theme.animationDuration,
          fill: "forwards",
        });
      }, theme.animationBetweenElements * i);
      item.setAttribute("data-loaded", "true");
    });
  }

  elementFromBottom(toReveal: HTMLElement[]) {
    toReveal.forEach((item, i) => {
      if (item.getAttribute("data-loaded")) {
        return;
      }
      setTimeout(() => {
        const elementMove = [
          { transform: "translateY(30px)", opacity: "0" },
          { transform: "translateY(0px)", opacity: "1" },
        ];
        item.animate(elementMove, {
          duration: theme.animationDuration,
          fill: "forwards",
        });
      }, theme.animationBetweenElements * i);
      item.setAttribute("data-loaded", "true");
    });
  }

  elementFromRight(toReveal: HTMLElement[]) {
    toReveal.forEach((item, i) => {
      if (item.getAttribute("data-loaded")) {
        return;
      }
      setTimeout(() => {
        const elementMove = [
          { transform: "translateX(30px)", opacity: "0" },
          { transform: "translateX(0px)", opacity: "1" },
        ];
        item.animate(elementMove, {
          duration: theme.animationDuration,
          fill: "forwards",
        });
        item.setAttribute("data-loaded", "true");
      }, theme.animationBetweenElements * i);
    });
  }

  elementFromLeft(toReveal: HTMLElement[]) {
    toReveal.forEach((item, i) => {
      if (item.getAttribute("data-loaded")) {
        return;
      }
      setTimeout(() => {
        const elementMove = [
          { transform: "translateX(-30px)", opacity: "0" },
          { transform: "translateX(0px)", opacity: "1" },
        ];
        item.animate(elementMove, {
          duration: theme.animationDuration,
          fill: "forwards",
        });
        item.setAttribute("data-loaded", "true");
      }, theme.animationBetweenElements * i);
    });
  }

  animateElement(animatedItem: HTMLElement, index: number) {
    const options = {
      integer: index,
      type: animatedItem.dataset.animation as keyof ElementaryAnimation | undefined,
    };

    if (this.intersectionObserver[index]) {
      this.intersectionObserver[index].disconnect();
    }

    this.intersectionObserver[index] = new IntersectionObserver(
      (results) => {
        const integer = options.integer;
        const elements: HTMLElement[] = [];

        results.forEach((result) => {
          if (result.isIntersecting || result.intersectionRatio > 0) {
            elements.push(result.target as HTMLElement);
            this.intersectionObserver[integer].unobserve(result.target);
          }
        });

        if (elements.length === 0) {
          return;
        }

        const animations: { [key: string]: keyof ElementaryAnimation } = {
          elementFromTop: 'elementFromTop',
          elementFromBottom: 'elementFromBottom',
          elementFromRight: 'elementFromRight',
          elementFromLeft: 'elementFromLeft',
          elementScaleIn: 'elementScaleIn',
          elementScaleOut: 'elementScaleOut'
        };

        const animation = animations[options.type || ''];
        if (animation) {
          (this[animation] as Function)(elements);
        }
      },
      { threshold: 0.15 }
    );

    if (animatedItem.classList.contains('animated_content')) {
      this.intersectionObserver[index].observe(animatedItem);
    }

    animatedItem.querySelectorAll('.animated_content').forEach((item) => {
      this.intersectionObserver[index].observe(item as HTMLElement);
    });
  }
}

export default ElementaryAnimation;