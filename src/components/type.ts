/*
 * @Author: ykx
 * @Date: 2022-10-10 11:35:33
 * @LastEditTime: 2022-10-11 15:31:00
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\src\components\type.ts
 */
export interface ScrollOption {
    yPos: number;
    xPos: number;
    dir: string;
    step: number;
    singleStepDis: number;
    singleDataCount: number;
    hoverStop: boolean;
    waitTime: number;
    autoPlay: boolean;
    loop: true;
    slideIndex: number;
}