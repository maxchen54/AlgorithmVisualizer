export function getAnimations(array, id) {
    const animations = [];
    if (array.length <= 1) return array;
    const temp = array.slice();
    switch(id) {
        case 0:
            mergeSortHelper(array, 0, array.length - 1, temp, animations);
            break;
        case 1:
            bubble(array, animations, temp);
            break;
        case 2:
            var a = quick(array, animations, 0, array.length - 1);
            console.log(a);
            break;
        default:
            console.log("error");

    }
    
    return animations;
}

function quick(mainArray, animations, left, right) {
    if(left < right) {
        var splitIndex = partition(mainArray, animations, left, right);
        quick(mainArray, animations, left, splitIndex - 1);
        quick(mainArray, animations, splitIndex + 1, right);
    }
    return mainArray;
}

function partition(mainArray, animations, left, right) {
    var i = left;
    var j = right - 1;
    var pivot = mainArray[right];

    while (i < j) {
        while (i < right && mainArray[i] < pivot) {
            i++;
        }
        while (j > left && mainArray[j] >= pivot) {
            j--;
        }
        if (i < j) {
            var temp = mainArray[i];

            animations.push([i, j, true]);
            animations.push([i, j, true]);
            animations.push([i, mainArray[j], false]);
            animations.push([j, mainArray[i], false]);

            mainArray[i] = mainArray[j];
            mainArray[j] = temp;
        }
    }

    if (mainArray[i] > pivot) {
        temp = mainArray[i];

        animations.push([i, right, true]);
        animations.push([i, right, true]);
        animations.push([i, mainArray[right], false]);
        animations.push([right, mainArray[i], false]);

        mainArray[i] = mainArray[right];
        mainArray[right] = temp;
    }
    
    return i;
}

function bubble(mainArray, animations) {
    for (var i = 0; i < mainArray.length; i++) {
        for (var j = 0; j < (mainArray.length - i - 1); j++) {
            
            if (mainArray[j] > mainArray[j + 1]) {
                var temp = mainArray[j];   
                animations.push([j, j + 1, true]);
                animations.push([j, j + 1, true]); //indicate the two values being compared by showing color         
                animations.push([j + 1, mainArray[j], false]); //swap the two values
                animations.push([j, mainArray[j + 1], false]);
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
            }
        }
    }
}

function mergeSortHelper(mainArray, start, end, tempArray, animations) {
    if(start === end) {
        return;
    }
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(tempArray, start, middle, mainArray, animations);
    mergeSortHelper(tempArray, middle + 1, end, mainArray, animations);
    merge(mainArray, start, middle, end, tempArray, animations);

}

function merge(mainArray, start, middle, end, tempArray, animations) {
    let i = start;
    let j = middle + 1;
    let t = start;

    while(i <= middle && j <= end) {
        animations.push([i, j, true]); // to update color
        animations.push([i, j, true]); // to revert color
        if (tempArray[i] <= tempArray[j]) {
            animations.push([t, tempArray[i], false]);
            mainArray[t++] = tempArray[i++];
        } else {
            animations.push([t, tempArray[j], false]);
            mainArray[t++] = tempArray[j++];
        }
    }
    while (i <= middle) {
        animations.push([i, i, true]);
        animations.push([i, i, true]);
        animations.push([t, tempArray[i], false]);
        mainArray[t++] = tempArray[i++];
    }
    while (j <= end) {
        animations.push([j, j, true]);
        animations.push([j, j, true]);
        animations.push([t, tempArray[j], false]);
        mainArray[t++] = tempArray[j++];
    }
}
