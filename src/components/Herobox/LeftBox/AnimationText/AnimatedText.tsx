"use client";
import React, { useState, useEffect } from "react";

interface TxtType {
  toRotate: string[];
  el: HTMLElement;
  loopNum: number;
  period: number;
  txt: string;
  isDeleting: boolean;
  tick(): void;
}

function AnimatedText(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  const TxtType = function (this: TxtType, el: HTMLElement, toRotate: string[], period: string) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
  };

  TxtType.prototype.tick = function (this: TxtType): void {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function (): void {
      that.tick();
    }, delta);
  };

  function Run(): void {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new (TxtType as any)(elements[i] as HTMLElement, JSON.parse(toRotate), period!);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  }

  useEffect(() => {
    // Update the document title using the browser API
    Run();
    console.log("s");
  }, []);

  return (
    <a
      href="###"
      className="typewrite"
      data-period="2000"
      data-type='[ "Hello", "I am Ravinder" ]'
    >
      {" "}
      <span className="wrap"></span>
    </a>
  );
}

export default AnimatedText;
