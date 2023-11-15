import { Association, UmlClass } from './umlClass'

// Find the UML class linked to the association
export const findAssociatedClass = (
    association: Association,
    sourceUmlClass: UmlClass,
    umlClasses: readonly UmlClass[],
    searchedAbsolutePaths: string[] = [],
): UmlClass | undefined => {
    const umlClass = umlClasses.find((targetUmlClass) => {
        const targetParentClass =
            association.parentUmlClassName &&
            targetUmlClass.parentId !== undefined
                ? umlClasses[targetUmlClass.parentId]
                : undefined
        return isAssociated(
            association,
            sourceUmlClass,
            targetUmlClass,
            targetParentClass,
        )
    })

    // If a link was found
    if (umlClass) return umlClass

    // Could not find a link so now need to recursively look at imports of imports
    // add to already recursively processed files to avoid getting stuck in circular imports
    searchedAbsolutePaths.push(sourceUmlClass.absolutePath)
    return findChainedImport(
        association,
        sourceUmlClass,
        umlClasses,
        searchedAbsolutePaths,
    )
}

// Tests if source class can be linked to the target class via an association
const isAssociated = (
    association: Association,
    sourceUmlClass: UmlClass,
    targetUmlClass: UmlClass,
    targetParentUmlClass: UmlClass,
): boolean => {
    if (association.parentUmlClassName) {
        return (
            // class is in the same source file
            (association.targetUmlClassName === targetUmlClass.name &&
                association.parentUmlClassName === targetParentUmlClass?.name &&
                sourceUmlClass.absolutePath === targetUmlClass.absolutePath) ||
            // imported classes with no explicit import names
            (association.targetUmlClassName === targetUmlClass.name &&
                association.parentUmlClassName === targetParentUmlClass?.name &&
                sourceUmlClass.imports.some(
                    (i) =>
                        i.absolutePath === targetUmlClass.absolutePath &&
                        i.classNames.length === 0,
                )) ||
            // imported classes with explicit import names or import aliases
            sourceUmlClass.imports.some(
                (importLink) =>
                    importLink.absolutePath === targetUmlClass.absolutePath &&
                    importLink.classNames.some(
                        (importedClass) =>
                            // If a parent contract with no import alias
                            (association.parentUmlClassName !== undefined &&
                                association.parentUmlClassName ===
                                    importedClass.className &&
                                importedClass.className ===
                                    targetUmlClass.name &&
                                importedClass.alias == undefined) ||
                            // If a parent contract with import alias
                            (association.parentUmlClassName !== undefined &&
                                association.parentUmlClassName ===
                                    importedClass.alias &&
                                importedClass.className ===
                                    targetUmlClass.name),
                    ),
            )
        )
    }
    return (
        // class is in the same source file
        (association.targetUmlClassName === targetUmlClass.name &&
            sourceUmlClass.absolutePath === targetUmlClass.absolutePath) ||
        // imported classes with no explicit import names
        (association.targetUmlClassName === targetUmlClass.name &&
            sourceUmlClass.imports.some(
                (i) =>
                    i.absolutePath === targetUmlClass.absolutePath &&
                    i.classNames.length === 0,
            )) ||
        // imported classes with explicit import names or import aliases
        sourceUmlClass.imports.some(
            (importLink) =>
                importLink.absolutePath === targetUmlClass.absolutePath &&
                importLink.classNames.some(
                    (importedClass) =>
                        // no import alias
                        (association.targetUmlClassName ===
                            importedClass.className &&
                            importedClass.className === targetUmlClass.name &&
                            importedClass.alias == undefined) ||
                        // import alias
                        (association.targetUmlClassName ===
                            importedClass.alias &&
                            importedClass.className === targetUmlClass.name),
                ),
        )
    )
}

const findChainedImport = (
    association: Association,
    sourceUmlClass: UmlClass,
    umlClasses: readonly UmlClass[],
    searchedRelativePaths: string[],
): UmlClass | undefined => {
    // Get all valid imports. That is, imports that do not explicitly import contracts or interfaces
    // or explicitly import the source class
    const imports = sourceUmlClass.imports.filter(
        (i) =>
            i.classNames.length === 0 ||
            i.classNames.some(
                (cn) =>
                    (association.targetUmlClassName === cn.className &&
                        !cn.alias) ||
                    association.targetUmlClassName === cn.alias,
            ),
    )
    // For each import
    for (const importDetail of imports) {
        // Find a class with the same absolute path as the import so we can get the new imports
        const newSourceUmlClass = umlClasses.find(
            (c) => c.absolutePath === importDetail.absolutePath,
        )
        if (!newSourceUmlClass) {
            // Could not find a class in the import file so just move onto the next loop
            continue
        }
        // Avoid circular imports
        if (searchedRelativePaths.includes(newSourceUmlClass.absolutePath)) {
            // Have already recursively looked for imports of imports in this file
            continue
        }

        // find class linked to the association without aliased imports
        const umlClass = findAssociatedClass(
            association,
            newSourceUmlClass,
            umlClasses,
            searchedRelativePaths,
        )
        if (umlClass) return umlClass

        // find all aliased imports
        const aliasedImports = importDetail.classNames.filter((cn) => cn.alias)
        // For each aliased import
        for (const aliasedImport of aliasedImports) {
            const umlClass = findAssociatedClass(
                { ...association, targetUmlClassName: aliasedImport.className },
                newSourceUmlClass,
                umlClasses,
                searchedRelativePaths,
            )
            if (umlClass) return umlClass
        }
    }
    return undefined
}
